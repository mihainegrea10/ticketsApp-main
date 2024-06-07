// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt1GO5zKIldSKJFVl9v-6Zzw45KufVtgg",
  authDomain: "mihai-5f741.firebaseapp.com",
  projectId: "mihai-5f741",
  storageBucket: "mihai-5f741.appspot.com",
  messagingSenderId: "81133319691",
  appId: "1:81133319691:web:0e781c940934e38c42390e",
  measurementId: "G-VFTGSSCPJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
