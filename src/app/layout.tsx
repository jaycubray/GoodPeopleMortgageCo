import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { SocialProofToast } from "@/components/SocialProofToast";
import { RateTicker } from "@/components/RateTicker";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Good People Mortgage Company",
    default: "Good People Mortgage Company — Home Loan Experts",
  },
  description:
    "Realize your dreams of home ownership. FHA, VA, USDA, Conventional & Jumbo loans in Saint Petersburg, FL. Get pre-approved in minutes!",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Good People Mortgage Company",
    title: "Good People Mortgage Company — Home Loan Experts",
    description:
      "Realize your dreams of home ownership. FHA, VA, USDA, Conventional & Jumbo loans. Get pre-approved in minutes!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good People Mortgage Company — Home Loan Experts",
    description:
      "Realize your dreams of home ownership. FHA, VA, USDA, Conventional & Jumbo loans. Get pre-approved in minutes!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <RateTicker />
        <Header />
        <main id="main-content" className="flex-1 pt-[6.5rem]">{children}</main>
        <Footer />
        <FloatingCTA />
        <SocialProofToast />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
