"use client";

import { useEffect, useState } from "react";
import AudioReactiveOrb from "./AudioReactiveOrb";
import CornerAccents from "./CornerAccents";
import CustomCursor from "./CustomCursor";
import FloatingElements from "./FloatingElements";
import HeroShell from "./HeroShell";
import ScrollingMarquee from "./ScrollingMarquee";

const OnionStyleProfile = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const topScrollingTexts = [
    "FULL SITE UNDER CONSTRUCTION",
    "BUT DON'T WORRY, I'M STILL HERE",
    "WE'LL SEE EACH OTHER SOON",
  ];

  const bottomScrollingTexts = [
    "EVIDENTLY, I NEED A DESIGNER",
    "I'M A DEVELOPER",
  ];

  return (
    <div className="h-dvh w-full bg-gray-900 text-stone-200 overflow-hidden relative cursor-none ">
      {/* Scrolling Text at Top */}
      <ScrollingMarquee
        texts={topScrollingTexts}
        ends={{ prefix: "🚧", suffix: "🚧" }}
        position="top"
        className={`transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hero Section */}
      <HeroShell loaded={loaded} />
      {/* Flowing Light Orb */}
      <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`transform transition-all duration-2000 delay-800 ${
            loaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <AudioReactiveOrb />
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
