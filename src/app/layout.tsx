import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Anti-Funes",
  description:
    "Remember less. Think more. A meditative web app inspired by Borges that helps you practice the art of letting go.",
  url: "https://anti-funes.vercel.app",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anti-Funes: The Art of Productive Forgetting",
  description: "Remember less. Think more. A meditative web app inspired by Borges that helps you practice the art of letting go.",
  metadataBase: new URL("https://anti-funes.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anti-Funes: The Art of Productive Forgetting",
    description: "Remember less. Think more. A meditative web app inspired by Borges that helps you practice the art of letting go.",
    url: "https://anti-funes.vercel.app",
    siteName: "Anti-Funes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navigation />
        {children}
        <footer className="py-8 text-center">
          <p className="text-xs text-muted-foreground">
            Built by{" "}
            <Link
              href="https://kuvoco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Kuvo Co.
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
