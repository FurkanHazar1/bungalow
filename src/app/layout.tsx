import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bungalov Kiralama Sistemi",
  description: "Bungalow yönetim ve kiralama platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold hover:opacity-80">
                🏡 Bungalov Sistemi
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="hover:opacity-80 transition">
                  Anasayfa
                </Link>
                <Link href="/customers" className="hover:opacity-80 transition">
                  Müşteriler
                </Link>
                <Link href="/owners" className="hover:opacity-80 transition">
                  Sahibler
                </Link>
                <Link href="/bungalows" className="hover:opacity-80 transition">
                  Bungalowlar
                </Link>
                <Link href="/rentals" className="hover:opacity-80 transition">
                  Kiralamalar
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
