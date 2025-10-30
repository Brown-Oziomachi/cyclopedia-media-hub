import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import CookieBanner from "@/components/Cookies";
import AuthProvider from "@/components/AuthProvider";

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
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TT01H9803V"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TT01H9803V');
    `,
          }}
        />

        {/* Google Publisher Verification */}
        <meta
          name="google-site-verification"
          content="4yWhwbOmhk-JWr1kLxfcMvXzm0pFcvZO2zbxh3Le9B0"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Suspense fallback={<Loader />}>
            <AuthProvider>
              <Navbar />
              <CookieBanner />
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
