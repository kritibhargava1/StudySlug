// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPuspGQ6QMVCL2IGUI1gej_UDGTJPlonQ",
  authDomain: "studyslug-82330.firebaseapp.com",
  projectId: "studyslug-82330",
  storageBucket: "studyslug-82330.firebasestorage.app",
  messagingSenderId: "583192423078",
  appId: "1:583192423078:web:ce351c6087b3f3fd002267",
  measurementId: "G-YGER3M4G16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);