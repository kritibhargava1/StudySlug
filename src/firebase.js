
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPuspGQ6QMVCL2IGUI1gej_UDGTJPlonQ",
  authDomain: "studyslug-82330.firebaseapp.com",
  projectId: "studyslug-82330",
  storageBucket: "studyslug-82330.firebasestorage.app",
  messagingSenderId: "583192423078",
  appId: "1:583192423078:web:ce351c6087b3f3fd002267",
  measurementId: "G-YGER3M4G16"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);