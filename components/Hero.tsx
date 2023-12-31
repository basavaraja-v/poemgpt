'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavLink from './NavLink';

let heroImages = [
  {
    src: '/1.png', text: `On Hearing your voice <br/> 
    my soul  flutters like butterfly...<br/> 
    Deep conversation along with you takes me to the eternal world of happiness..`,
  },
  {
    src: '/2.png', text: `In your eyes, I find the sea so wide, <br />
    With roses, love in every shade,<br />
    Beneath the stars, our hearts collide,<br />
    Piano keys, our love's serenade.` },
  {
    src: '/3.png', text: `In a world of joy and delight,<br />
    Where kittens play and sleep at night,<br />
    There's a magical place, so bright and gay,<br />
    Where rainbows shine and colors sway.`,
  },
];

const occasions = [
  'Anniversary',
  "Valentine's Day",
  'Birthday',
  'Baby Shower',
  'Engagement',
  'Naming Ceremeny',
  'Just Because',
  'Kids'
  // Add more occasions as needed
];

export default function Hero() {
  const [currentOccasionIndex, setCurrentOccasionIndex] = useState(0);

  useEffect(() => {
    // Function to cycle through occasions every few seconds
    const interval = setInterval(() => {
      setCurrentOccasionIndex((prevIndex) =>
        prevIndex === occasions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change the duration as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section>
      <div className="custom-screen pt-20 pb-5 text-gray-600 bg-gradient-to-b from-pink-100 to-pink-200">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
            Generate Poems for <span className="text-pink-500 font-bold animate-pulse">
              {occasions[currentOccasionIndex]} ❤️
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg">
            Craft poems that <span className="font-extrabold">capture hearts</span><span className="font-extrabold animate-pulse"> 💕</span> with the power of AI.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <NavLink
              href="/generatepoem"
              className="text-white bg-pink-500 hover:bg-pink-600 active:bg-pink-700 rounded-full py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Start Generating
            </NavLink>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-1">
            {heroImages.map((imageData, idx) => (
              <div key={idx} className="relative group">
                <Image
                  alt={`Poetic scene ${idx + 1}`}
                  src={imageData.src}
                  width={500}
                  height={500}
                  className="rounded-lg group-hover:opacity-100 transition-opacity duration-300"
                // Removed opacity reduction on the image to ensure the black background blends well
                />
                <div
                  id={`text-${idx}`}
                  className="absolute inset-0 flex items-center justify-center p-4"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black background
                    color: '#FFFFFF', // White text color for contrast
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', // Center text alignment
                    fontSize: '1rem', // Adjust font size as needed
                    lineHeight: '1.5', // Adjust line height for better readability
                  }}
                  dangerouslySetInnerHTML={{ __html: imageData.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}