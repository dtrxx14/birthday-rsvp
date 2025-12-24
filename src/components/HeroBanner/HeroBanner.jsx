import React from "react";

export default function HeroBanner() {
  const characters = [
    { src: "/assets/images/characters/Abby.png", style: "top-10 -left-[50px] lg:-left-[70px] rotate-[90deg] w-[150px] lg:w-[200px]" },
    { src: "/assets/images/characters/Bert.png", style: "bottom-72 -right-[80px] -rotate-[40deg] w-[200px] lg:w-[250px]" },
    { src: "/assets/images/characters/Big Bird.png", style: "-bottom-[70px] -left-[90px] lg:left-0 rotate-6 w-[230px] lg:w-[300px]" },
    { src: "/assets/images/characters/Cookie Monster.png", style: "-bottom-[70px] -right-[45px] lg:right-0 -rotate-6 w-[200px] lg:w-[280px]" },
    { src: "/assets/images/characters/Elmo1.png", style: "top-[50px] lg:top-[60px] left-28 lg:left-72 -translate-y-1/2 rotate-[160deg] w-[200px] lg:w-[250px]" },
    { src: "/assets/images/characters/Grover.png", style: "-bottom-[70px] -left-[20px] lg:left-36 w-[200px] lg:w-[250px]" },
    { src: "/assets/images/characters/Rosita.png", style: "hidden md:block top-[50px] lg:top-[60px] right-20 lg:right-72 -translate-y-1/2 -rotate-[160deg] w-[180px] lg:w-[250px]" },
  ];

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

      {/* Characters */}
      {characters.map((char, idx) => (
        <img
          key={idx}
          src={char.src}
          alt=""
          className={`absolute pointer-events-none ${char.style}`}
        />
      ))}

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
          <span className="text-softBlue">T</span>{" "}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 6l5 5 5-5"
              />
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
