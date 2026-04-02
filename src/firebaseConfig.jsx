import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore'; // ✅ Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyC5dkaSXuRgMmmkHESUuf9mUDtV5aZmvbs",
  authDomain: "skillforge-3b79b.firebaseapp.com",
  projectId: "skillforge-3b79b",
  storageBucket: "skillforge-3b79b.firebasestorage.app",
  messagingSenderId: "893373610018",
  appId: "1:893373610018:web:e700df773808a56a13327b",
  measurementId: "G-0BSZS1SDFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ Firestore instance

export {
  app,
  auth,
  db, // ✅ exported Firestore
  googleProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseConfig,
};
