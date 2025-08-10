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
;

// Initialize Firebase app 2
const app2 = initializeApp({
  apiKey: "AIzaSyBBHpmyrzv6W39jbq3PJN0bVsKEcygkL2w",
  authDomain: "webwizform.firebaseapp.com",
  projectId: "webwizform",
  storageBucket: "webwizform.firebasestorage.app",
  messagingSenderId: "758086016613",
  appId: "1:758086016613:web:18af922e5816b3f959f08c"
}, 'app2');

const app3 = initializeApp({
apiKey: "AIzaSyDUXloJCOwQSB0I8E5iVNfPmSXBxuMNUYg",
authDomain: "webwizcreation.firebaseapp.com",
projectId: "webwizcreation",
storageBucket: "webwizcreation.firebasestorage.app",
messagingSenderId: "461834275724",
appId: "1:461834275724:web:a74f86efb391ca6b5e24a9"
}, 'app3');

const app4 = initializeApp({
 apiKey: "AIzaSyCZeGJPXFeGintulvX8FgJ0g59NjDES1sU",
  authDomain: "login-auth-27b23.firebaseapp.com",
  databaseURL: "https://login-auth-27b23-default-rtdb.firebaseio.com",
  projectId: "login-auth-27b23",
  storageBucket: "login-auth-27b23.firebasestorage.app",
  messagingSenderId: "806893447110",
  appId: "1:806893447110:web:4c226b36b0cec81f9df4c7"
}, 'app4')

//  if (!firebase.apps.length) {
//    firebase.initializeApp(firebaseConfig);
// }

const db1 = getFirestore(app1);
const db2 = getFirestore(app2);
const db3 = getFirestore(app3);
const db4 = getFirestore(app4);

export { app1, app2, app3, app4 };
export { db1, db2, db3, db4 };
