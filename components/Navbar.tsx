'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

const Navbar = () => {
  const [state, setState] = useState(false);

  const navigation = [
    // { title: 'Testimonials', path: '#testimonials' },
    { title: 'Home', path: '/' },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Add closing the navbar menu when navigating
    const handleState = () => {
      document.body.classList.remove('overflow-hidden');
      setState(false);
    };

    handleState();
  }, [pathname, searchParams]);

  const handleNavMenu = () => {
    setState(!state);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <header>
      <nav
        className={`bg-gradient-to-r from-indigo-500 to-white w-full md:static md:text-sm fixed top-0 left-0 z-10`}
      >
        <div className="custom-screen items-center mx-auto md:flex">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="logo" width={30} height={30} style={{ filter: 'brightness(0) invert(1)' }} />
              <div className="font-bold text-lg text-white">PoemGPT</div>
            </Link>
            <div className="md:hidden">
              <button
                role="button"
                aria-label="Open the menu"
                className="text-gray-500 hover:text-gray-800"
                onClick={handleNavMenu}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="center-badge">
            <a href="https://www.producthunt.com/posts/poemgpt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-poemgpt" target="_blank">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=420350&theme=light" alt="PoemGPT - Craft poems that capture hearts 💕 with the power of AI | Product Hunt" style={{ width: 250, height: 54 }} width="250" height="54" />
            </a>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:pb-0 md:mt-0 md:block ${state ? '' : 'hidden'
              }`}
          >
            <ul className="text-gray-700 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:text-gray-600 md:font-medium">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="duration-150 hover:text-gray-900">
                    <Link href={item.path} className="block">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              <li>
                <NavLink
                  href="/generatepoem"
                  className="text-white bg-pink-500 hover:bg-pink-600 active:bg-pink-700 rounded-full py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Start Generating
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
