import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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

export async function POST(req) {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const data = await req.json();
    const { Username, Password } = data;
    const docRef = doc(db, "Staff-login", "login");
    const docSnap = await getDoc(docRef);
    const loginData = docSnap.data();
    if (Username === loginData.username && Password === loginData.password) {
      console.log("success");
      return NextResponse.json({ result: "Success" }, { status: 200 });
    } else {
      console.log("username/password incorrect");
      return NextResponse.json(
        { result: "Incorrect Username/Password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ result: error }, { status: 500 });
  }
}
