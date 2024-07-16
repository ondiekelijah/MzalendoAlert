import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTopButton from "./components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MzalendoAlert: Help Find Missing Persons Through Tweets",
  description: "Support our efforts to locate missing loved ones. Post tweets, find helpful links, and get guidance on what to do when someone goes missing. Your tweets can bring someone home.",
  metadataBase: new URL("https://www.mzalendoalert.com"),
  openGraph: {
    title: "MzalendoAlert: Help Find Missing Persons Through Tweets",
    description: "Support our efforts to locate missing loved ones. Post tweets, find helpful links, and get guidance on what to do when someone goes missing. Your tweets can bring someone home.",
    url: "https://www.mzalendoalert.com",
    siteName: "MzalendoAlert",
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
