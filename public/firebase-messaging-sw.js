importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC87iDeJ_NQYURA3J5Dv0OGb2uULVcoC20",
  authDomain: "cyclopedia-db.firebaseapp.com",
  projectId: "cyclopedia-db",
  storageBucket: "cyclopedia-db.firebasestorage.app",
  messagingSenderId: "698827026080",
  appId: "1:698827026080:web:cd5ea93dab757dc8a4a3c5",
  measurementId: "G-51M2DTMTFK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/icon/android-launchericon-512-512.png",
  });
});

// Optional cache for offline
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("cyclopedia-cache")
      .then((cache) =>
        cache.addAll([
          "/",
          "/manifest.json",
          "/icon/android-launchericon-192-192.png",
          "/icon/android-launchericon-512-512.png",
        ])
      )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
