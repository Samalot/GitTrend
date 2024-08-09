import type { Metadata } from "next";
import Image from "next/image";
import StoreProvider from '../lib/StoreProvider';
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitTrend",
  description: "Popular new GitHub repos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-10`}>
        <StoreProvider>
          <header className="flex flex-row justify-center" data-testid="layout">
            <h1 className="text-white font-bold text-5xl inline-block"><span className="text-purple-300">Git</span>Trend</h1>
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert ml-5"
              src="/logo.png"
              alt="GitTrend Logo"
              width={50}
              height={50}
              priority
            />
          </header>

          <Navigation />
          
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
