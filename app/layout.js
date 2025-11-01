import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import CookieBanner from "@/components/Cookies";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script"; // ✅ Added for structured data

export const metadata = {
  title: "The Cyclopedia | News & media company",
  description:
    "The Cyclopedia is your trusted platform for news, articles, and hidden truths. Stay updated with reliable information across politics, business, technology, and more.",
  icons: {
    icon: "/truth.png",
    shortcut: "/truth.png",
    apple: "/truth.png",
  },
  openGraph: {
    title: "The Cyclopedia | News & Media Company",
    description:
      "The Cyclopedia is your trusted platform for news, articles, and hidden truths. Stay updated with reliable information across politics, business, technology, and more.",
    url: "https://www.thecyclopedia.com.ng",
    siteName: "The Cyclopedia",
    images: [
      {
        url: "https://www.thecyclopedia.com.ng/truth.png",
        width: 800,
        height: 600,
        alt: "The Cyclopedia",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cyclopedia | News & Media Company",
    description:
      "The Cyclopedia is your trusted platform for news, articles, and hidden truths.",
    images: "https://www.thecyclopedia.com.ng/truth.png",
    creator:
      "https://x.com/cyclopedia_news?t=if7x7ktTlukRhO9muucjng&s=09",
  },
  referrer: "strict-origin-when-cross-origin",
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
        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Cyclopedia RSS Feed"
          href="https://www.thecyclopedia.com.ng/feed.xml"
        />

        {/* ✅ Structured Data (JSON-LD for SEO) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "The Cyclopedia",
              url: "https://www.thecyclopedia.com.ng",
              logo: "https://www.thecyclopedia.com.ng/truth.png",
              sameAs: [
                "https://x.com/cyclopedia_news?t=if7x7ktTlukRhO9muucjng&s=09",
                // "https://facebook.com/thecyclopedia",
                "https://www.instagram.com/cyclopedia_news?igsh=MThvdDEwa3c3aGpsMQ==",
              ],
              description:
                "The Cyclopedia is a trusted news and media platform covering politics, business, law, technology, and hidden truths.",
              founder: {
                "@type": "Person",
                name: "Brown Oziomachi",
              },
              foundingDate: "2024-01-01",
              publisher: {
                "@type": "Organization",
                name: "The Cyclopedia",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.thecyclopedia.com.ng/truth.png",
                },
              },
            }),
          }}
        />

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

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408243121163767"
          crossOrigin="anonymous"
        ></script>

        {/* Google Publisher Verification */}
        <meta
          name="google-site-verification"
          content="4yWhwbOmhk-JWr1kLxfcMvXzm0pFcvZO2zbxh3Le9B0"
        />

        {/* Bing Webmaster Verification */}
        <meta
          name="msvalidate.01"
          content="DB9001C412118B30B9B328331C769BBB"
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
