import Hero from '@/components/Hero';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        {/* Existing tags */}
        <meta name="google-adsense-account" content="ca-pub-2117177152504343" />
        {/* ... other tags ... */}
      </Head>
      <Hero />
    </>
  );
}
