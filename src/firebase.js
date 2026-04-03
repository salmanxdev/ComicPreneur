// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKQQ2mzm4EMo_3mAiux05s7zyVU-FGFWk",
  authDomain: "comicpreneur-16.firebaseapp.com",
  projectId: "comicpreneur-16",
  storageBucket: "comicpreneur-16.firebasestorage.app",
  messagingSenderId: "830584555173",
  appId: "1:830584555173:web:23910ee7d9f9b09d192f4c",
  measurementId: "G-51SXQ5E408"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (safe handling)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.warn("Analytics not supported in this environment");
}

// Firestore
export const db = getFirestore(app);

// Cloud Storage
export const storage = getStorage(app);

// Export app
export default app;