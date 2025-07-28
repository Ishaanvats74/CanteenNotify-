import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
  databaseURL: "https://asia-south2.firebaseio.com",
};

// Get user notifications
export async function GET(req) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    return NextResponse.json(
      { notificationItems: data?.notificationItems || {} },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Enable notification for user
export async function POST(req) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const body = await req.json();
    const { UserId, itemName } = body;

    const docRef = doc(db, "Users", UserId);
    await setDoc(
      docRef,
      { notificationItems: { [itemName]: true } },
      { merge: true }
    );
    return NextResponse.json({ result: "completed" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Disable notification for user
export async function PATCH(req) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const body = await req.json();
    const { UserId, itemName } = body;

    const docRef = doc(db, "Users", UserId);
    await updateDoc(docRef, { [`notificationItems.${itemName}`]: false });

    return NextResponse.json({ result: "completed" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Check stock changes and send notifications
export async function PUT(req) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Starting stock check...");

    // Get current menu items from your menu collection
    const menuCollection = collection(db, "menu");
    const menuSnapshot = await getDocs(menuCollection);
    const currentMenu = [];

    menuSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.name) {
        currentMenu.push({
          name: data.name,
          available: data.available,
        });
      }
    });

    console.log("Current menu items:", currentMenu.length);

    // Get previous menu state
    const prevMenuRef = doc(db, "Users", "menu-tracker");
    const prevMenuSnap = await getDoc(prevMenuRef);
    const previousMenu = prevMenuSnap.exists()
      ? prevMenuSnap.data().previousMenu || []
      : [];

    console.log("Previous menu items:", previousMenu.length);

    // If this is the first time, just store current menu and return
    if (previousMenu.length === 0) {
      await setDoc(prevMenuRef, {
        previousMenu: currentMenu,
        lastUpdated: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          message: "First time setup - menu state saved",
          changes: 0,
          notificationsSent: 0,
          stockChanges: [],
        },
        { status: 200 }
      );
    }

    // Compare and find changes
    const stockChanges = [];
    currentMenu.forEach((currentItem) => {
      const prevItem = previousMenu.find(
        (item) => item.name === currentItem.name
      );

      if (prevItem && prevItem.available !== currentItem.available) {
        stockChanges.push({
          name: currentItem.name,
          wasAvailable: prevItem.available,
          nowAvailable: currentItem.available,
        });
      }
    });

    console.log("Stock changes found:", stockChanges);

    // If there are changes, notify users
    let notificationsSent = 0;
    if (stockChanges.length > 0) {
      try {
        // Get all users with notifications
        const usersCollection = collection(db, "Users");
        const usersSnapshot = await getDocs(usersCollection);

        for (const userDoc of usersSnapshot.docs) {
          // Skip the menu-tracker document
          if (userDoc.id === "menu-tracker") continue;

          const userData = userDoc.data();
          const userNotifications = userData.notificationItems || {};

          // Check which items this user wants notifications for
          for (const change of stockChanges) {
            if (userNotifications[change.name] === true) {
              // Log notification
              const message = change.nowAvailable
                ? `🎉 ${change.name} is back in stock!`
                : `😞 ${change.name} is now out of stock`;

              console.log(`Notification for user ${userDoc.id}: ${message}`);
              notificationsSent++;
            }
          }
        }
      } catch (userError) {
        console.log("Error processing users:", userError);
      }

      // Update previous menu state
      await setDoc(prevMenuRef, {
        previousMenu: currentMenu,
        lastUpdated: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        changes: stockChanges.length,
        notificationsSent,
        stockChanges,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("PUT Error:", error);
    return NextResponse.json(
      {
        error: error.message,
        details: error.stack,
      },
      { status: 500 }
    );
  }
}
