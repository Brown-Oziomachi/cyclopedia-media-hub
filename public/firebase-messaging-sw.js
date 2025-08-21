// Import Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Initialize Firebase with your real config
firebase.initializeApp({
  apiKey: "AIzaSyC87iDeJ_NQYURA3J5Dv0OGb2uULVcoC20",
  authDomain: "cyclopedia-db.firebaseapp.com",
  projectId: "cyclopedia-db",
  storageBucket: "cyclopedia-db.firebasestorage.app",
  messagingSenderId: "698827026080",
  appId: "1:698827026080:web:cd5ea93dab757dc8a4a3c5",
  measurementId: "G-51M2DTMTFK",
});

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Fallbacks in case notification payload is missing fields
  const notificationTitle =
    payload?.notification?.title || "Cyclopedia Notification";
  const notificationOptions = {
    body: payload?.notification?.body || "",
    icon:
      payload?.notification?.icon || "/icon/android-launchericon-512-512.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: Catch global errors in the service worker
self.addEventListener("error", (event) => {
  console.error("SW error:", event);
});

// Ensure the SW claims clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
