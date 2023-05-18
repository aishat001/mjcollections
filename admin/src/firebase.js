// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN2Kjzivp7TtEm46BnrWdHSFwNcEn_13o",
  authDomain: "mjcollections-481d5.firebaseapp.com",
  projectId: "mjcollections-481d5",
  storageBucket: "mjcollections-481d5.appspot.com",
  messagingSenderId: "848001978758",
  appId: "1:848001978758:web:94af65d2f11896429b5c07",
  measurementId: "G-L0K1RV2CYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app