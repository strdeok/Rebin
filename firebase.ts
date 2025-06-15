// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZn1E5j1UZ8qVKK1MQRZQJu-nlGya1EX0",
  authDomain: "rebin-e8883.firebaseapp.com",
  projectId: "rebin-e8883",
  storageBucket: "rebin-e8883.firebasestorage.app",
  messagingSenderId: "435824947753",
  appId: "1:435824947753:web:eaf92f38e015fadb81a238",
  measurementId: "G-PKCZ2GC2V8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
