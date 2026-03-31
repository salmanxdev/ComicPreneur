// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // add this
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDH0hDwmK0kp5eRROB2CnCTP2mwxdw5EzI",
  authDomain: "cosmicpreneur-520d8.firebaseapp.com",
  projectId: "cosmicpreneur-520d8",
  storageBucket: "cosmicpreneur-520d8.firebasestorage.app",
  messagingSenderId: "796315603825",
  appId: "1:796315603825:web:2e21c1230164de941d5cd0",
  measurementId: "G-SE7KLDHXT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app); // <-- add this

export default app;