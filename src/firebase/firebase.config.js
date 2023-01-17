// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAhQZWP5l62PmheGbF7GkAL3MRGooNL7qI",
  authDomain: "big-ecomerce-eshop-32e06.firebaseapp.com",
  projectId: "big-ecomerce-eshop-32e06",
  storageBucket: "big-ecomerce-eshop-32e06.appspot.com",
  messagingSenderId: "79523494530",
  appId: "1:79523494530:web:fb3b72fb402ec45334529b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;