
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

// Using Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Webwiz Creation",
  description: "Explore creativity with Webwiz Creation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
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
