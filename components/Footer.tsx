const Footer = () => (
  <footer className="bg-gradient-to-r from-purple-800 to-pink-500">
    <div className="custom-screen py-16">
      <div className="mt-10 py-10 border-t flex flex-col md:flex-row items-center justify-between">
        <p className="text-white mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} HeyiDB. All rights reserved.
        </p>
        <div className="flex space-x-4">
          {/* <a
            target="_blank"
            href="https://poemgpt.heyidb.com/privacypolicy"
            className="text-white hover:underline transition"
          >
            Privacy Policy
          </a> */}
          {/* <a
            target="_blank"
            href="https://twitter.com/heyidb"
            className="text-white hover:underline transition"
          >
            Twitter
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/heyidb"
            className="text-white hover:underline transition"
          >
            Facebook
          </a> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
