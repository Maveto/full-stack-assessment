import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Favicon from "@/components/Favicon";
import Providers from "./Providers";
import UserInitializer from "@/components/UserInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mauri Shop",
  description: "Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-light.ico" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <UserInitializer />
          <Favicon />
          <Header />
          <main className="flex-grow px-4 sm:px-8 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
