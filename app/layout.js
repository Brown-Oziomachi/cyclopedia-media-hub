import ClientRootLayout from "@/components/ClientRootLayout";
import "./globals.css";

// ✅ Metadata for Next.js App Router
export const metadata = {
  title: "THE CYCLOPEDIA",
  icons: {
    icon: "/icon/android-launchericon-512-512.png",
    shortcut: "/icon/android-launchericon-512-512.png",
    apple: "/icon/android-launchericon-512-512.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Optional PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
      </head>
      <body className="antialiased">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
