import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexus Atelier - Studio Architecture",
    template: "%s | NEXUS ATELIER",
  },
  description:
    "Kompromisslose Performance-First E-Commerce-Storefront (Next.js App Router, RSC, ISR) & Echtzeit Admin-Dashboard mit TanStack Table v8 und Recharts.",
  keywords: [
    "E-Commerce",
    "Next.js App Router",
    "Server Components",
    "Audio Hardware",
    "Workstations",
    "TanStack Table",
    "Recharts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
