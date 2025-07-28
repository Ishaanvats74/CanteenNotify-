"use client";
import { Switch } from "@/app/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [menuList, setMenuList] = useState([]);
  const { isSignedIn, user } = useUser();
  const [notifications, setNotifications] = useState({});
  const router = useRouter();
  const UserId = user?.id;

  const fetchNotifications = async () => {
    if (!UserId) return;
    try {
      const res = await fetch(`/api/notification?userId=${UserId}`, {
        method: "GET",
      });
      const result = await res.json();
      if (result.notificationItems) {
        setNotifications(result.notificationItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = async (item) => {
    try {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        const notification = new Notification("Notifications Enabled", {
          body: `You'll get alerts when ${item.name} stock changes!`,
          icon: "/images/vecteezy_waiter-s-hand-illustration_.jpg",
        });

        const res = await fetch("/api/notification", {
          method: "POST",
          body: JSON.stringify({ UserId, itemName: item.name }),
        });

        setNotifications((prev) => ({ ...prev, [item.name]: true }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFalseNotification = async (item) => {
    try {
      const res = await fetch("/api/notification", {
        method: "PATCH",
        body: JSON.stringify({ UserId, itemName: item.name }),
      });
      setNotifications((prev) => ({ ...prev, [item.name]: false }));
    } catch (error) {
      alert(error);
    }
  };

  // Check for stock changes using your database
  const checkStockChanges = async () => {
    try {
      const response = await fetch("/api/notification", {
        method: "PUT",
      });
      const result = await response.json();

      if (result.changes > 0) {
        console.log(`${result.changes} items changed stock status`);
        console.log(`${result.notificationsSent} notifications sent`);

        // Show browser notification for current user if they have notifications enabled
        result.stockChanges.forEach((change) => {
          if (
            notifications[change.name] &&
            Notification.permission === "granted"
          ) {
            const message = change.nowAvailable
              ? `${change.name} is back in stock! 🎉`
              : `${change.name} is now out of stock 😞`;

            new Notification("Stock Alert", {
              body: message,
              icon: "/images/vecteezy_waiter-s-hand-illustration_.jpg",
            });
          }
        });
      }
    } catch (error) {
      console.log("Error checking stock changes:", error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("/api/home", {
          method: "GET",
        });
        const result = await res.json();
        setMenuList(result.result);

        // Check for stock changes after fetching data
        await checkStockChanges();
      } catch (error) {
        alert(error);
      }
    };

    fetchNotifications();
    fetchdata();

    const interval = setInterval(() => {
      fetchdata();
    }, 3000);

    return () => clearInterval(interval);
  }, [UserId, notifications]);

  return (
    <div className="min-h-full flex flex-col items-center ">
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mt-20">
        {menuList.map((item, index) => (
          <div key={index} className="flex flex-col shadow-lg rounded-lg p-2">
            <div className="space-x-30  flex items-center justify-between m-2">
              <p className="text-2xl font-semibold">{item.name}</p>
              <p
                className={` font-semibold text-white px-2 py-1 text-sm ${
                  item.available ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {item.available ? "In stock" : "Out of stock"}
              </p>
            </div>
            <div className="flex justify-between m-2 space-x-30 ">
              <p className="text-xs text-gray-400">
                {notifications[item.name]
                  ? "🔔 You'll get alerts"
                  : "Get stock alerts"}
              </p>
              <Switch
                checked={notifications[item.name] || false}
                onCheckedChange={(checked) => {
                  if (!isSignedIn) {
                    router.push("/sign-in");
                    return;
                  }
                  if (checked) {
                    handleNotification(item);
                  } else {
                    handleFalseNotification(item);
                  }
                }}
                className={"h-5 "}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
