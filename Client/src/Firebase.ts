
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chatapp-291ef.firebaseapp.com",
  projectId: "chatapp-291ef",
  storageBucket: "chatapp-291ef.appspot.com",
  messagingSenderId: "841202442425",
  appId: "1:841202442425:web:3b5930489ba299bbeefb68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);