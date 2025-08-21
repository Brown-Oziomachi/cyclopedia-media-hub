import "./globals.css";
import ClientRootLayout from "./ClientRootLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest & Theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
        <link
          rel="apple-touch-icon"
          href="/icon/android-launchericon-512-512.png"
        />
        <title>THE CYCLOPEDIA</title>
      </head>
      <body className="antialiased">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
