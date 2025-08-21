// app/layout.js
import ClientRootLayout from "./ClientRootLayout";

export const metadata = {
  title: "THE CYCLOPEDIA",
  icons: {
    icon: "/hid.png",
    shortcut: "/hid.png",
    apple: "/hid.png",
  },
};

export default function RootLayout({ children }) {
  return <ClientRootLayout>{children}</ClientRootLayout>;
}
