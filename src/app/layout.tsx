import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "../components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pelican Point East Condos | Waterfront Living in Naples, FL",
    template: "%s | Pelican Point East Condos",
  },
  description: "Waterfront living on Venetian Bay in Park Shore, Naples, Florida. Walk to The Village Shops, enjoy radiant sunsets, and private beach access via the Park Shore Association. Luxury condominiums with boat slips, covered parking, and resort-style amenities.",
  keywords: [
    "Pelican Point East",
    "Naples condos",
    "Park Shore condos",
    "Venetian Bay condos",
    "waterfront condos Naples",
    "Naples Florida condominiums",
    "Park Shore Drive",
    "luxury condos Naples",
    "condos with boat slips",
    "Naples real estate",
  ],
  authors: [{ name: "Pelican Point East" }],
  creator: "Pelican Point East",
  publisher: "Pelican Point East",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ppecondo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Pelican Point East Condos",
    title: "Pelican Point East Condos | Waterfront Living in Naples, FL",
    description: "Waterfront living on Venetian Bay in Park Shore, Naples, Florida. Walk to The Village Shops, enjoy radiant sunsets, and private beach access via the Park Shore Association.",
    images: [
      {
        url: "/DroneDay.jpg",
        width: 1200,
        height: 630,
        alt: "Pelican Point East Condominiums on Venetian Bay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pelican Point East Condos | Waterfront Living in Naples, FL",
    description: "Waterfront living on Venetian Bay in Park Shore, Naples, Florida. Walk to The Village Shops, enjoy radiant sunsets, and private beach access.",
    images: ["/DroneDay.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData type="LocalBusiness" />
        {children}
      </body>
    </html>
  );
}
