"use client";

import React from "react";
import AudioReactiveOrb from "./AudioReactiveOrb";

interface HeroSectionProps {
  loaded: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ loaded }) => {
  return (
    <div className="space-y-8 -mt-20">
      {/* Main Tagline - Top Right */}
      <div className="absolute top-1/3 right-12 lg:right-24">
        <div
          className={`transform transition-all duration-2000 delay-500 ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="text-right text-lg lg:text-xl font-mono leading-tight">
            <div>DESIGN SO</div>
            <div>GOOD IT MAKES</div>
            <div>YOU CRY</div>
          </div>
        </div>
      </div>

      {/* Flowing Light Orb */}
      <div className="absolute top-1/2 right-24 lg:right-32 transform -translate-y-1/2">
        <div
          className={`transform transition-all duration-2000 delay-800 ${
            loaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <AudioReactiveOrb />
        </div>
      </div>

      {/* Main Brand Name */}
      <div
        className={`transform transition-all duration-2000 delay-300 ${
          loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h1 className="text-7xl lg:text-8xl font-black leading-tight text-stone-200 float">
          <div>Henry</div>
          <div>Barnett</div>
          <div className="text-5xl italic opacity-80">Full Stack Dev</div>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
