// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZeGJPXFeGintulvX8FgJ0g59NjDES1sU",
  authDomain: "login-auth-27b23.firebaseapp.com",
  projectId: "login-auth-27b23",
  storageBucket: "login-auth-27b23.firebasestorage.app",
  messagingSenderId: "806893447110",
  appId: "1:806893447110:web:4c226b36b0cec81f9df4c7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };
export default app;