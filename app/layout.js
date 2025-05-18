import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import logo from "@/public/logo.png";
import Script from 'next/script'; // <-- Import the Script component



const RECAPTCHA_V3_SITE_KEY = '6LfRYD4rAAAAABqP_F8glwmCbq5BKeMdq8Q91Wik'; // <-- Your key here!
export const metadata = {
  title: "Webwiz Creation - The Sun Web",
  description: "A website development company",
  keywords: "web development, web design, software development",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`.className} antialiased`}>
        
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_V3_SITE_KEY}`}
          strategy="afterInteractive"/>

        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

