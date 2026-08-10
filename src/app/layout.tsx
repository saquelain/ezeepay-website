import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ezeepay — Banking For The New Digital Bharat | AEPS, Money Transfer & 60+ Services",
  description:
    "Join 10,00,000+ Ezeepay agents earning with AEPS, money transfer, bill payments, recharge, travel booking and 60+ services. Minimum investment, zero working capital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Preloader />
      <SmoothScroll>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </SmoothScroll>
      </body>
    </html>
  );
}
