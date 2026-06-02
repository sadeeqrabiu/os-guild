import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSGuild",
  description: "Build Open Source, Together",
  metadataBase: new URL("https://www.osguild.dev"),
  openGraph: {
    title: "OS Guild — Build Open Source, Together",
    description:
      "OS Guild is a community where developers collaborate to build impactful open source projects.",
    url: "https://www.osguild.dev",
    siteName: "OS Guild",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OS Guild — Build Open Source, Together",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OS Guild — Build Open Source, Together",
    description:
      "OS Guild is a community where developers collaborate to build impactful open source projects.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
