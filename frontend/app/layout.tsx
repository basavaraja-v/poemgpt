import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
let title = 'PoemGPT - Create Personalized Romantic Poems with AI';
let description = 'Craft beautiful and personalized romantic poems for your loved ones using AI. Compose unique poems for various occasions.';
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
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}