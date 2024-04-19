// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEOoavNPqsnmZQOro7_m2LsXCpVBekjkY",
  authDomain: "brand-shop-c3371.firebaseapp.com",
  projectId: "brand-shop-c3371",
  storageBucket: "brand-shop-c3371.appspot.com",
  messagingSenderId: "441196442169",
  appId: "1:441196442169:web:45f2b0c0638935124793e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;