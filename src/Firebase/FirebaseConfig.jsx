// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVOhze6yHoNIz-VYHBxKyPZZ62K23cxA0",
  authDomain: "gonatural-6a1de.firebaseapp.com",
  projectId: "gonatural-6a1de",
  storageBucket: "gonatural-6a1de.appspot.com",
  messagingSenderId: "979812708232",
  appId: "1:979812708232:web:0cf5613ec4377fdec1d43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

const auth = getAuth(app);
auth.useDeviceLanguage();
export { app, fireDB, auth , RecaptchaVerifier, signInWithPhoneNumber };

