import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import CookieBanner from "@/components/Cookies";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script";

export const metadata = {
  title: "The Cyclopedia | News & media company",
  description:
    "The Cyclopedia is your trusted platform for news, articles, and hidden truths. Stay updated with reliable information across politics, business, technology, and more.",
  metadataBase: new URL('https://www.thecyclopedia.com.ng'),
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
        url: "/truth.png",
        width: 800,
        height: 800,
        alt: "The Cyclopedia - News & Media Company",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cyclopedia | News & Media Company",
    description:
      "The Cyclopedia is your trusted platform for news, articles, and hidden truths. Stay updated with reliable information.",
    images: ["/truth.png"],
    site: "@cyclopedia_news",
    creator: "@cyclopedia_news",
  },
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'OZzRskyXW_iycUUwaw9qZmUWgN1resVfz6nkTo0rZE',
    other: {
      'msvalidate.01': 'DB9001C412118B30B9B328331C769BBB',
    },
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
        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Cyclopedia RSS Feed"
          href="https://www.thecyclopedia.com.ng/feed.xml"
        />

        {/* Structured Data (JSON-LD for SEO) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "The Cyclopedia",
              url: "https://www.thecyclopedia.com.ng",
              logo: {
                "@type": "ImageObject",
                url: "https://www.thecyclopedia.com.ng/truth.png",
                width: 800,
                height: 800,
              },
              image: {
                "@type": "ImageObject",
                url: "https://www.thecyclopedia.com.ng/truth.png",
                width: 800,
                height: 800,
              },
              sameAs: [
                "https://x.com/cyclopedia_news",
                "https://www.instagram.com/cyclopedia_news",
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
                  width: 800,
                  height: 800,
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

              {/* Google AdSense Ad Placement */}
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", textAlign: "center" }}
                  data-ad-layout="in-article"
                  data-ad-format="fluid"
                  data-ad-client="ca-pub-8408243121163767"
                  data-ad-slot="9662897902"
                ></ins>
                <Script
                  id="adsbygoogle-init"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
                  }}
                />
              </div>

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