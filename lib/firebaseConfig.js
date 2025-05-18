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


const db1 = getFirestore(app1);
const db2 = getFirestore(app2);
const db3 = getFirestore(app3);
export { app1, app2, app3,  };
export { db1, db2, db3, };
