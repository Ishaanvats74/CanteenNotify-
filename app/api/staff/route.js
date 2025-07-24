import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server";
import {  setDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_FIREBASE_APP_ID,
    databaseURL: "https://asia-south2.firebaseio.com",
};

export async function GET() {

    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const q = query(collection(db, "menu"));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
             result.push(doc.data())
            // console.log(doc.id, " => ", doc.data());
        });
        return NextResponse.json({result:result},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}

export async function PATCH(req) {
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const body = await req.json()
        const {itemName, itemAvailable} = body;
        const q = query(collection(db, "menu"), where("name", "==", itemName));
        const querySnapshot = await getDocs(q);
        const docToUpdate = querySnapshot.docs[0];
        const docId = docToUpdate.id;
        const updateRef = doc(db, "menu", docId);
        const result = await updateDoc(updateRef, {
            available: !itemAvailable
        });
        console.log(result)
        return NextResponse.json({itemAvailable:itemAvailable},{status:200})

    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}

export async function POST(req){
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const body = await req.json()
        const {itemName, stock} = body;
        await setDoc(doc(db, "menu", `${itemName}`),{
            name: itemName,
            available: stock
        });
        return NextResponse.json({result:"hi"},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}

export async function DELETE(){
    
}