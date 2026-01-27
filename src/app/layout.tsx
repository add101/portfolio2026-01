import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adrian Lamour - Portfolio",
  description: "Portfolio site - Adrian Lamour - multidisciplinary designer and developer.",
  
  // Keywords for SEO
  keywords: ["Adrian Lamour", "portfolio", "designer", "developer", "web design", "web development"],
  
  // Author info
  authors: [{ name: "Adrian Lamour" }],
  creator: "Adrian Lamour",
  
  // Open Graph (for social media sharing - Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adrianlamour.com",
    title: "Adrian Lamour - Portfolio",
    description: "Portfolio site - Adrian Lamour - multidisciplinary designer and developer.",
    siteName: "Adrian Lamour Portfolio",
    images: [
      {
        url: "/images/gallery/201-100.jpg", // 1200x630px image
        width: 1200,
        height: 630,
        alt: "Adrian Lamour Portfolio",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Adrian Lamour - Portfolio",
    description: "Portfolio site - Adrian Lamour - multidisciplinary designer and developer.",
    images: ["/og-image.jpg"],
    creator: "https://x.com/Growmotion3d", 
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  // Verification (add when you set these up)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JJVMKC37H0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G-JJVMKC37H0');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
