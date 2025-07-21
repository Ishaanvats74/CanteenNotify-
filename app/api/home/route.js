import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
  databaseURL: "https://asia-south2.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
