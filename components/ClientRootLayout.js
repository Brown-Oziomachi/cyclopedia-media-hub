"use client";

import { useEffect } from "react";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app1 } from "@/lib/firebaseConfig";

export default function ClientRootLayout({ children }) {
  useEffect(() => {
    // Only run in browser
    if (!("serviceWorker" in navigator)) return;

    // Register service worker
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => console.log("✅ Service Worker registered", reg))
      .catch((err) => console.error("❌ SW registration failed", err));

    // Request notification permission
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") return;

      try {
        const messaging = getMessaging(app1);

        // Get FCM token
        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
          .then((token) => console.log("FCM Token:", token))
          .catch(console.error);

        // Listen for foreground messages
        onMessage(messaging, (payload) => {
          if (!payload?.notification) return;

          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: "/icon/android-launchericon-512-512.png",
          });
        });
      } catch (error) {
        console.error("Firebase Messaging error:", error);
      }
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </AuthProvider>
    </Suspense>
  );
}

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
