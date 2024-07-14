import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  openGraph: {
    title: "MzalendoAlert",
    description: "Every Tweet Counts: Help Us Locate Missing Loved Ones.",
    url: "https://www.mzalendoalert.com",
    siteName: "MzalendoAlert",
    images: [
      {
        url: "https://wwww.mzalendoalert.com/mzalendo-alert.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://wwww.mzalendoalert.com/mzalendo-alert.png",
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
    </html>
  );
}
