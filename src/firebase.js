// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH0hDwmK0kp5eRROB2CnCTP2mwxdw5EzI",
  authDomain: "cosmicpreneur-520d8.firebaseapp.com",
  projectId: "cosmicpreneur-520d8",
  storageBucket: "cosmicpreneur-520d8.appspot.com",
  messagingSenderId: "796315603825",
  appId: "1:796315603825:web:2e21c1230164de941d5cd0",
  measurementId: "G-SE7KLDHXT9"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.warn("Firebase analytics not initialized:", err);
}

// Initialize Firestore
export const db = getFirestore(app);

// Export Firebase app if needed elsewhere
export default app;