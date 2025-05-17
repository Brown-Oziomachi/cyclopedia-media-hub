// src/lib/firebase.ts (or .js)

import { initializeApp, getApps, getApp } from "firebase/app"; // Added getApps and getApp
import { getFirestore } from "firebase/firestore";
// Make sure to import the correct provider:
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Your web app's Firebase configuration (for webwiz-blog)
const webwizBlogConfig = {
  apiKey: "AIzaSyDNE2M2ehkl-BnQlA_MJxx2UgMTIjO5j20",
  authDomain: "webwiz-blog.firebaseapp.com",
  projectId: "webwiz-blog",
  storageBucket: "webwiz-blog.firebasestorage.app",
  messagingSenderId: "438400828724",
  appId: "1:438400828724:web:bb076787e21f8c69101161",
  measurementId: "G-23JE41RJXX",
};

// Your web app's Firebase configuration (for webwizform)
const webwizFormConfig = {
  apiKey: "AIzaSyBBHpmyrzv6W39jbq3PJN0bVsKEcygkL2w",
  authDomain: "webwizform.firebaseapp.com",
  projectId: "webwizform",
  storageBucket: "webwizform.firebasestorage.app",
  messagingSenderId: "758086016613",
  appId: "1:758086016613:web:18af922e5816b3f959f08c",
};

// Your web app's Firebase configuration (for webwizcreation)
const webwizCreationConfig = {
  apiKey: "AIzaSyDUXloJCOwQSB0I8E5iVNfPmSXBxuMNUYg",
  authDomain: "webwizcreation.firebaseapp.com",
  projectId: "webwizcreation",
  storageBucket: "webwizcreation.firebasestorage.app",
  messagingSenderId: "461834275724",
  appId: "1:461834275724:web:a74f86efb391ca6b5e24a9",
};

function getOrCreateApp(config, name) {
  const apps = getApps();
  if (apps.find((app) => app.name === name)) {
    return getApp(name);
  }
  return initializeApp(config, name);
}

const app1 = getOrCreateApp(webwizBlogConfig, "app1"); // Your webwiz-blog app
const app2 = getOrCreateApp(webwizFormConfig, "app2");
const app3 = getOrCreateApp(webwizCreationConfig, "app3");

// === App Check Initialization (Client-Side Only) ===
// This MUST be guarded to run only in the browser
if (typeof window !== "undefined") {
  // Optional: Set debug token for local development
  if (process.env.NODE_ENV !== "production") {
    // NOTE: You MUST add the debug token printed in the console
    // to your app's App Check settings in the Firebase Console.
    // Learn more: https://firebase.google.com/docs/app-check/web/debug
    // @ts-ignore // Ignore TypeScript error for global variable if needed
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  try {
    // Check if App Check is already initialized for this app instance
    // This prevents re-initialization errors during hot module replacement in development
    if (!app1.options.appCheck) {
      initializeAppCheck(app1, {
        // Pass the correct app instance (app1 for webwiz-blog)
        provider: new ReCaptchaV3Provider(
          "6Lf6Vz4rAAAAAK7lhu4wZmAFUn7xLPaBVyXN7DCW"
        ), // Your reCAPTCHA Site Key
        isTokenAutoRefreshEnabled: true, // Generally recommended
        // Add debug logging during development
        debug: process.env.NODE_ENV !== "production",
      });
      console.log("Firebase App Check initialized for app1 (webwiz-blog)."); // Optional log
    }
  } catch (error) {
    console.error("Firebase App Check initialization failed for app1:", error);
    // Handle error - maybe App Check is not supported or reCAPTCHA script didn't load
  }
}

const db1 = getFirestore(app1); // Firestore for webwiz-blog
const db2 = getFirestore(app2); // Firestore for webwizform
const db3 = getFirestore(app3); // Firestore for webwizcreation

export {
  app1, // Export webwiz-blog app
  app2,
  app3,
  db1, // Export Firestore for webwiz-blog
  db2,
  db3,
};
