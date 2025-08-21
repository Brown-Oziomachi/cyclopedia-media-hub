// app/ClientRootLayout.js
"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense, useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app1 } from "@/lib/firebaseConfig";

export default function ClientRootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => console.log("✅ Service Worker registered", reg))
        .catch((err) => console.error("❌ SW registration failed", err));

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const messaging = getMessaging(app1);
          getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
            .then((token) => console.log("FCM Token:", token))
            .catch(console.error);

          onMessage(messaging, (payload) => {
            new Notification(payload.notification.title, {
              body: payload.notification.body,
              icon: "/icon/android-launchericon-512-512.png",
            });
          });
        }
      });
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Navbar />
        {children}
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
