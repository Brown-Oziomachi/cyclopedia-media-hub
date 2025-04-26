
import "./globals.css";
import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

const PoppinsFont = Poppins({
  subsets: ['latin'],

    display: 'swap',
    style
  });

  export const metadata = {
    title: 'Webwiz',
    description: 'My portfolio website',
  };

  const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
})
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={PoppinsFont.variable}>
      <body className={` antialiased`}>
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
