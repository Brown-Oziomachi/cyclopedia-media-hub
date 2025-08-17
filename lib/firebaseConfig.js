import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Initialize Firebase app 1
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

// App 3
const app3 = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE3_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE3_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE3_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE3_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE3_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE3_APP_ID,
  },
  "app3"
);

// App 4
const app4 = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE4_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE4_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE4_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE4_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE4_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE4_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE4_APP_ID,
  },
  "app4"
);

// // App 5 (for auth)
// const app5 = initializeApp(
//   {
//     apiKey: "AIzaSyCZeGJPXFeGintulvX8FgJ0g59NjDES1sU",
//     authDomain: "login-auth-27b23.firebaseapp.com",
//     databaseURL: "https://login-auth-27b23-default-rtdb.firebaseio.com",
//     projectId: "login-auth-27b23",
//     storageBucket: "login-auth-27b23.appspot.com",
//     messagingSenderId: "806893447110",
//     appId: "1:806893447110:web:9f58ba6c78d2db4e9df4c7",
//   },
//   "app5"
// );

// Firestore connections
const db1 = getFirestore(app1);
const db2 = getFirestore(app2);
const db3 = getFirestore(app3);
const db4 = getFirestore(app4);

// Auth instance

export { app1, app2, app3, app4,};
export { db1, db2, db3, db4 };
