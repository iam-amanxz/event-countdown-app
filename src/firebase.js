import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB-ovvTHyugbMcaOh2m5WmrH41K8cslumQ",
  authDomain: "event-countdwon.firebaseapp.com",
  projectId: "event-countdwon",
  storageBucket: "event-countdwon.appspot.com",
  messagingSenderId: "58867007839",
  appId: "1:58867007839:web:ee1a45aebb6e72511836ea",
  measurementId: "G-PZ9RLVC8DZ",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const db = app.firestore();

export default app;
