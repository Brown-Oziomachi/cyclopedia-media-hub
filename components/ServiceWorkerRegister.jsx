"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("✅ Service Worker registered", reg))
        .catch((err) => console.error("❌ SW registration failed", err));
    }
  }, []);

  return null; // nothing to render
}
