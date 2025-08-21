self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installing...");
  event.waitUntil(
    caches.open("cyclopedia-cache").then((cache) => {
      return cache.addAll([
        "/", // homepage
        "/manifest.json",
        "/icon/android-launchericon-192-192.png",
        "/icon/android-launchericon-512-512.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
