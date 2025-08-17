
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata = {
  title: "Cyclopedia",
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
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased">
        <Suspense fallback={<div>Loading page...</div>}>
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
