import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTopButton from "./components/scrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MzalendoAlert",
  description: "Every Tweet Counts: Help Us Locate Missing Loved Ones.",
  metadataBase: new URL("https://www.mzalendoalert.com"),
  openGraph: {
    title: "MzalendoAlert",
    description: "Every Tweet Counts: Help Us Locate Missing Loved Ones.",
    url: "https://www.mzalendoalert.com",
    siteName: "MzalendoAlert",
    images: [
      {
        url: "/mzalendo-alert.png",
        width: 800,
        height: 600,
      },
      {
        url: "/mzalendo-alert.png",
        width: 1800,
        height: 1600,
        alt: "MzalendoAlert",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <ScrollToTopButton/>
    </html>
  );
}
