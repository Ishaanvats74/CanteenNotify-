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
        const notification = new Notification("Example notification", {
          body: `You will be notified when ${item.name} is back in stock!`,
          data: { hello: "world" },
          icon: "/images/vecteezy_waiter-s-hand-illustration_.jpg",
        });

        notification.addEventListener("click", () => {
          window.open("http://localhost:3000/", "_blank");
        });
        const res = await fetch("/api/notification", {
          method: "POST",
          body: JSON.stringify({ UserId, itemName: item.name }),
        });
        const data = await res.json();
        console.log(data);

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
      const data = await res.json();
      console.log(data);
      setNotifications((prev) => ({ ...prev, [item.name]: false }));
    } catch (error) {
      alert(error);
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
  }, [UserId]);
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
              <p className="text-xs text-gray-400">Notify me on this item</p>
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
