// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHH7K1HaS_y-GpTkKBOPf27SHU22XDfe0",
  authDomain: "mail-box-3eef5.firebaseapp.com",
  projectId: "mail-box-3eef5",
  storageBucket: "mail-box-3eef5.appspot.com",
  messagingSenderId: "477689341867",
  appId: "1:477689341867:web:153c1365bfa588125054ee",
  measurementId: "G-1XBYR9C63T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);