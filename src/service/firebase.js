import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
const firebaseConfig = {
  apiKey: "AIzaSyABZvoh7wNUCc8U6SUSyw0k69keK-A5_2Q",

  authDomain: "firez-be630.firebaseapp.com",

  projectId: "firez-be630",

  storageBucket: "firez-be630.appspot.com",

  messagingSenderId: "25399329869",

  appId: "1:25399329869:web:b7f4f12d4dbc7f60670804",

  measurementId: "G-GYQNW8BMLP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const functions = firebase.functions();
// firebase.functions().useEmulator("localhost", 5001);
export const firestore = firebase.firestore();
export const auth = firebase.auth();
