import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbeque",
  description: "Spotify for BBQs",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "Charley Wolf" }],
  other: {
    "msapplication-TileColor": "#171717",
    "mask-icon": "/safari-pinned-tab.svg",
    manifest: "/site.webmanifest",
  },
};

export const viewport: Viewport = {
  themeColor: [{ color: "#ffffff" }],
  minimumScale: 1,
  initialScale: 1,
  width:
    "device-width, shrink-to-fit=no, apple-mobile-web-app-capable=yes, apple-mobile-web-app-status-bar-style=black-translucent",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
