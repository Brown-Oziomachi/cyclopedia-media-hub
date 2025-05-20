import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

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
      <head>
        {/* Add your Google site verification meta tag here */}
        <meta
          name="google-adsense-account" content="ca-pub-8408243121163767"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
