import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
let title = 'PoemGPT - AI Poetry Generator | Create Your Own Poems';
let description = 'Discover the art of poetry with PoemGPT. Our AI-powered tool helps you create unique and touching poems for any occasion. Dive into the world of AI poetry today!';
let url = 'https://poemgpt.heyidb.com/'; // Replace with your actual URL
let ogimage = 'https://poemgpt.heyidb.com/poemgpt/og-image.png'; // Replace with your actual image URL
let sitename = 'HeiDB - PoemGPT'; // Replace with your actual site name

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title: 'AI Poetry Generator - PoemGPT | Create, Share, and Enjoy Poems',
    description: 'Experience the fusion of creativity and technology. PoemGPT is your go-to platform for generating heartfelt, AI-crafted poems for every occasion.',
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title: 'PoemGPT - Explore AI Poetry | Generate Poems Instantly',
    description: 'Join the creative journey with PoemGPT. Harness the power of AI to craft poetic masterpieces that resonate with emotions and imagination.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2117177152504343" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2117177152504343"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
