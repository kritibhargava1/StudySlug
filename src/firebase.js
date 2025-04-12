// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPuspGQ6QMVCL2IGUI1gej_UDGTJPlonQ",
  authDomain: "studyslug-82330.firebaseapp.com",
  projectId: "studyslug-82330",
  storageBucket: "studyslug-82330.appspot.com",
  messagingSenderId: "583192423078",
  appId: "1:583192423078:web:ce351c6087b3f3fd002267",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
