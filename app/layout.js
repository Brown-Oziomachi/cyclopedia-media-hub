import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from '@vercel/analytics/next';
 

export const metadata = {
  title: "Webwiz Creation - The Sun Web",
  description: "A website development company",
  keywords: "web development, web design, software development",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8408243121163767" />

        {/* Other meta tags */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408243121163767"
          crossorigin="anonymous"
        ></script>
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
