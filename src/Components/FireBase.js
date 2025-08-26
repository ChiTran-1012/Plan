// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyC77fpTVYt5xx3_3Ou_kjHxlHuagc4yATc",
  authDomain: "plan-d44b9.firebaseapp.com",
  projectId: "plan-d44b9",
  storageBucket: "plan-d44b9.firebasestorage.app",
  messagingSenderId: "160568113728",
  appId: "1:160568113728:web:20865c651c161dc1bb7da5",
  measurementId: "G-9B4J6DC00Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Kết nối Firestore
export const db = getFirestore(app);
