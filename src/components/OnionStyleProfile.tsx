"use client";

import React, { useState, useEffect } from "react";
import ScrollingMarquee from "./ScrollingMarquee";
import CustomCursor from "./CustomCursor";
import TimeDisplay from "./TimeDisplay";
import HeroSection from "./HeroSection";
import CallToAction from "./CallToAction";
import FloatingElements from "./FloatingElements";
import CornerAccents from "./CornerAccents";
import Header from "./Header";

const OnionStyleProfile: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const topScrollingTexts = [
    "FULL SITE IS COOKIN...BRING TISSUES",
    "DESIGN SO GOOD IT MAKES YOU CRY",
    "CREATIVE STUDIO EXTRAORDINAIRE",
    "BRANDING THAT HITS DIFFERENT",
  ];

  const bottomScrollingTexts = [
    "FRONT END • BACK END • FULL STACK • ELECTRONIC MUSICIAN",
  ];

  return (
    <div className="h-screen w-full bg-gray-900 text-stone-200 overflow-hidden relative cursor-none">
      {/* Scrolling Text at Top */}
      <ScrollingMarquee
        texts={topScrollingTexts}
        position="top"
        className={`transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-12 pt-16 max-w-7xl mx-auto">
        {/* Header */}
        <Header loaded={loaded} />

        {/* Center Hero Section */}
        <HeroSection loaded={loaded} />

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          <TimeDisplay loaded={loaded} />
          <CallToAction loaded={loaded} />
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingElements loaded={loaded} />

      {/* Corner Accents */}
      <CornerAccents loaded={loaded} />

      {/* Scrolling Text at Bottom */}
      <ScrollingMarquee
        texts={bottomScrollingTexts}
        position="bottom"
        direction="reverse"
        speed="20s"
        className={`transition-all duration-1000 delay-2000 ${
          loaded ? "opacity-40" : "opacity-0"
        }`}
      />

      {/* Custom Cursor */}
      <CustomCursor loaded={loaded} />
    </div>
  );
};

export default OnionStyleProfile;
