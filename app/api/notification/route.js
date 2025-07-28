import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
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
      { notificationItems: data.notificationItems || {} },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
