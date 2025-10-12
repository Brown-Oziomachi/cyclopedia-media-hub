import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "The Cyclopedia | News & media company",
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Suspense fallback={<Loader />}>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
              <Analytics />
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
