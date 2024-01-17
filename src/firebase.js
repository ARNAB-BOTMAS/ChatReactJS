// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCAnqZL3YZXlrhDhPvTSoK8N-mNVdO0fuE",
  authDomain: "chat-cb91b.firebaseapp.com",
  projectId: "chat-cb91b",
  storageBucket: "chat-cb91b.appspot.com",
  messagingSenderId: "91215333899",
  appId: "1:91215333899:web:0c76b78c7bdf0ef44c150e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();