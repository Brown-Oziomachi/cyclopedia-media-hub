import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app1 = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  },
  "app1"
);

const app2 = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE2_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE2_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE2_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE2_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE2_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE2_APP_ID,
  },
  "app2"
);


const db1 = getFirestore(app1);
const db2 = getFirestore(app2);

const auth = getAuth(app1);

export { app1, app2 };
export { db1, db2};
export { auth };