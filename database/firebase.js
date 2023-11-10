import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuzmPKxNoREr16jDwZ5BfgvGvX70vJP6s",
    authDomain: "capgemini-app.appspot.com",
    projectId: "capgemini-app",
    storageBucket: "capgemini-app.appspot.com",
    messagingSenderId: "586844479697",
    appId: "1:586844479697:android:e949feb4deea869f6325f0"
}

const app=initializeApp(firebaseConfig);
export const firestore=getFirestore(app);