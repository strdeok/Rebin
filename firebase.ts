// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  authDomain: "rebin.vercel.app",
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGINGSENDERINGID,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUERMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
