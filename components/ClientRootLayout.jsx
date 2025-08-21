"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import { useFirebaseMessaging } from "@/hooks/useFirebaseMessaging";

export default function ClientRootLayout({ children }) {
  useFirebaseMessaging(); // ✅ handles all Firebase PWA logic

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
