import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], 
});

export const metadata: Metadata = {
  title: "LifetimeArt | Expert Home Renovations & Design",
  description:
    "LifetimeArt delivers exceptional home renovation services in London, specialising in kitchens, loft conversions, bathrooms, extensions, restorations, and external works. Guaranteed quality craftsmanship and personalised design.",
  keywords: [
    "LifetimeArt",
    "home renovation London",
    "kitchen design London",
    "loft conversions London",
    "bathroom renovation London",
    "home extensions London",
    "property restorations",
    "landscaping and external works",
  ],
  openGraph: {
    title: "LifetimeArt | Expert Home Renovations & Design",
    description:
      "Premium home renovation and design services in London. Kitchens, loft conversions, bathrooms, extensions, restorations, and outdoor spaces.",
    url: "",
    siteName: "LifetimeArt",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "LifetimeArt Home Renovations",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifetimeArt | Expert Home Renovations & Design",
    description:
      "Expert home renovation services in London, including kitchens, bathrooms, loft conversions, extensions, and restorations.",
    images: [""],
  },
  alternates: {
    canonical: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
