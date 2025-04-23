
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Webwiz Creation",
  description: "Explore creativity with Webwiz Creation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Poppins.className} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
