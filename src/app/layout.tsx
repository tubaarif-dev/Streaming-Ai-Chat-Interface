import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Inline SVG favicon — sleek "T" mark
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#g)"/>
  <text x="32" y="44" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="white" text-anchor="middle">T</text>
</svg>`;

export const metadata: Metadata = {
  title: "AI Capstone | Tuba Arif",
  description: "FlyRank AI Engineering Capstone Application",
  authors: [{ name: "Tuba Arif", url: "https://github.com/tubaarif-dev" }],
  icons: {
    icon: `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans m-0 p-0 transition-colors">
        {children}
      </body>
    </html>
  );
}