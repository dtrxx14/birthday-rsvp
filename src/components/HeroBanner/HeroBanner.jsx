import React from "react";

export default function HeroBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-rsvpBg text-white">
      {/* Moving background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="flex w-[200%] h-full animate-marquee">
          <img
            src="/assets/images/backgrounds/hero-banner.jpg"
            alt=""
            className="w-1/2 h-full object-cover opacity-60"
          />
          <img
            src="/assets/images/backgrounds/hero-banner.jpg"
            alt=""
            className="w-1/2 h-full object-cover opacity-60"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <img
          src="/assets/images/hero-banner-luke.png"
          alt="Sesame Street Banner"
          className="w-64 md:w-96"
        />
        <p className="font-chalk font-effect px-8 py-2 rounded bg-rsvpText/90 text-4xl md:text-6xl mb-4">
          <span className="text-primary">F</span>
          <span className="text-secondary">I</span>
          <span className="text-accent">R</span>
          <span className="text-success">S</span>
          <span className="text-softBlue">T</span>
          <span className="text-secondary"> </span>
          <span className="text-primary">B</span>
          <span className="text-secondary">I</span>
          <span className="text-accent">R</span>
          <span className="text-success">T</span>
          <span className="text-softBlue">H</span>
          <span className="text-primary">D</span>
          <span className="text-secondary">A</span>
          <span className="text-accent">Y</span>
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
          <div className="border-2 border-white rounded-full h-12 w-9 flex items-center justify-center">
            <div className="w-2 h-3 border-2 border-white rounded-full mb-6"></div>
          </div>
          <div className="bottom-8 flex flex-col items-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Top arrow */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 6l5 5 5-5"
              />
              {/* Bottom arrow */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 13l5 5 5-5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
