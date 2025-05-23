"use client";

import React from "react";

interface HeroSectionProps {
  loaded: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ loaded }) => {
  const linkClass =
    "fancy-underline transition-transform duration-300 ease-in-out hover:scale-105 w-fit self-end cursor-none text-stone-200 hover:text-stone-300";

  return (
    <div className="space-y-8 -mt-16 xs:flex xs:justify-between xs:items-center xs:gap-8 lg:flex-row lg:gap-0">
      {" "}
      {/* Main Brand Name */}
      <div
        className={`transform transition-all duration-2000 delay-300 w-1/2 ${
          loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h1 className="text-7xl lg:text-8xl font-black leading-tight text-stone-200 float">
          <div>Henry</div>
          <div>Barnett</div>
          <div className="text-5xl italic opacity-80">Full Stack Dev</div>
        </h1>
      </div>
      {/* Main Tagline - Top Right */}
      <div className="relative sm:absolute top-1/3 sm:right-4 -mt-32 sm:-mt-16">
        <div
          className={`transform transition-all duration-2000 delay-500 ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="text-right text-lg lg:text-xl font-mono leading-tight float-3 delay-1000 flex flex-col gap-2">
            <a
              href="https://github.com/hbarnett99"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              FULL STACK.
            </a>
            <a
              href="https://www.linkedin.com/in/henry-barnett-5a1668172/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              FULL PASSION.
            </a>
            <a
              href="https://open.spotify.com/playlist/51rqwmSQcMX4S1JPcJP3KZ?si=5150ab9a242a4728"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              FULL VOLUME.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
