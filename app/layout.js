import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

export const metadata = {
  title: "THE CYCLOPEDIA",
  icons: {
    icon: "/hid.png",
    shortcut: "/hid.png",
    apple: "/hid.png",
  },
};

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}

export default function RootLayout({ children }) {
  // ✅ Register service worker

  return (
    <html lang="en">
      <head>
        {/* PWA Manifest & Theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
<link rel="apple-touch-icon" href="/icons/android-launchericon-512-512.png" />
      </head>
      <body className="antialiased">
        <Suspense fallback={<Loader />}>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
