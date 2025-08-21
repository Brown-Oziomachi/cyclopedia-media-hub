"use client";
import { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app1 } from "@/lib/firebaseConfig";

export function useFirebaseMessaging() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => console.log("✅ SW registered", reg))
      .catch(console.error);

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") return;

      const messaging = getMessaging(app1);

      getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
        .then((token) => console.log("FCM Token:", token))
        .catch(console.error);

      onMessage(messaging, (payload) => {
        if (!payload?.notification) return;

        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/icon/android-launchericon-512-512.png",
        });
      });
    });
  }, []);
}
