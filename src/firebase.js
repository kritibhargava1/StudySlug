import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA-QJ-Pwa6zAXz24IwxOUGR4XUEfOkOCc",
  authDomain: "login-form-b9a7c.firebaseapp.com",
  projectId: "login-form-b9a7c",
  storageBucket: "login-form-b9a7c.appspot.com",
  messagingSenderId: "60291513749",
  appId: "1:60291513749:web:8005897cfd66a19e45ca9c",
  measurementId: "G-LELMF53W43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  db,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc
};
