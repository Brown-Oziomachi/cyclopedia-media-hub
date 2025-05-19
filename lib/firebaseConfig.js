import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Initialize Firebase app 1
const app1 = initializeApp({
  apiKey: "AIzaSyDNE2M2ehkl-BnQlA_MJxx2UgMTIjO5j20",
  authDomain: "webwiz-blog.firebaseapp.com",
  projectId: "webwiz-blog",
  storageBucket: "webwiz-blog.firebasestorage.app",
  messagingSenderId: "438400828724",
  appId: "1:438400828724:web:bb076787e21f8c69101161",
  measurementId: "G-23JE41RJXX"
}, 'app1');

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

const db1 = getFirestore(app1);
const db2 = getFirestore(app2);
const db3 = getFirestore(app3);
const db4 = getFirestore(app4)

export { app1, app2, app3, app4 };
export { db1, db2, db3, db4 };
