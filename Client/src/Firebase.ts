// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY, 
  authDomain: "rapportrave.firebaseapp.com",
  projectId: "rapportrave",
  storageBucket: "rapportrave.appspot.com",
  messagingSenderId: "19224041649",
  appId: "1:19224041649:web:783537a9aac1713c17ea90",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
