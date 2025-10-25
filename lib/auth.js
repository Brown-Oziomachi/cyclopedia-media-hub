import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZeGJPXFeGintulvX8FgJ0g59NjDES1sU",
  authDomain: "login-auth-27b23.firebaseapp.com",
  databaseURL: "https://login-auth-27b23-default-rtdb.firebaseio.com",
  projectId: "login-auth-27b23",
  storageBucket: "login-auth-27b23.firebasestorage.app",
  messagingSenderId: "806893447110",
  appId: "1:806893447110:web:9f58ba6c78d2db4e9df4c7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
