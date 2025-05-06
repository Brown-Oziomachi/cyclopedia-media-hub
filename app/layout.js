import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import logo from "@/public/logo.png";



export const metadata = {
  title: "Webwiz Creation - The Sun Web",
  description: "Feed your fantacies",
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
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

