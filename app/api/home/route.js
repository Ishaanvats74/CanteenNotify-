
import { initializeApp } from "firebase/app";
import { NextResponse } from "next/server";
import { doc, getDoc ,getFirestore} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
    const firebaseConfig = {
        apiKey: process.env.NEXT_FIREBASE_KEY,
        authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_FIREBASE_MESSAGE_SENDER_ID,
        appId: process.env.NEXT_FIREBASE_APP_ID,
        databaseURL: "https://asia-south2.firebaseio.com",
    };
    try {
        
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const q = query(collection(db, "menu"));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
             result.push(doc.data())
            console.log(doc.id, " => ", doc.data());
        });
        
        return NextResponse.json({result:result},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
        
    
}