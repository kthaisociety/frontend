import React from 'react';

const Footer = () => {
  return (
    // PASTE YOUR FOOTER JSX HERE
    <footer className="bg-white border-t border-black/10 mt-40">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center gap-12">

        {/* LEFT — VIDEO SYMBOL */}
        <div className="flex-shrink-0">
          <video
            src="/images/brand_assets/kthais-symbol-animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-40 md:w-48 lg:w-52 object-contain"
          />
        </div>

        {/* RIGHT — NAVIGATION + SOCIAL */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm">

          {/* NAVIGATION */}
          <div className="flex flex-col gap-4">
            <p className="uppercase tracking-widest text-black/40 text-xs">Navigation</p>
            <nav className="flex flex-col gap-2 text-black/60">
              <a href="/" className="hover:text-black transition">Home</a>
              <a href="/about" className="hover:text-black transition">About</a>
              <a href="/projects" className="hover:text-black transition">Projects</a>
              <a href="/contact" className="hover:text-black transition">Contact</a>
            </nav>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col gap-4">
            <p className="uppercase tracking-widest text-black/40 text-xs">Social</p>
            <div className="flex flex-col gap-2 text-black/60">
              <a href="https://linkedin.com" target="_blank" className="hover:text-black transition">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" className="hover:text-black transition">Instagram</a>
              <a href="https://github.com" target="_blank" className="hover:text-black transition">GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTNOTE */}
      <div className="mt-12 md:mt-16 flex justify-center md:justify-end px-6">
        <p className="text-xs text-black/40 tracking-wide">
          © {new Date().getFullYear()} KTH AI Society
        </p>
      </div>
    </footer>
  );
};

export default Footer;
