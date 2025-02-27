// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import "firebase/firestore";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs-28Bu8csp_7II8tPMJdqsLyD-R-9POo",
  authDomain: "converge-30311.firebaseapp.com",
  projectId: "converge-30311",
  storageBucket: "converge-30311.firebasestorage.app",
  messagingSenderId: "388793788999",
  appId: "1:388793788999:web:44ee774ce25d959db4df62",
  measurementId: "G-5KX778Z8G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {analytics,db,auth};