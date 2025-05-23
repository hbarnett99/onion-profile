"use client";

import React from "react";

interface ScrollingMarqueeProps {
  texts: string[];
  ends?: { prefix: string; suffix: string };
  direction?: "normal" | "reverse";
  speed?: string;
  className?: string;
  position: "top" | "bottom";
}

const ScrollingMarquee: React.FC<ScrollingMarqueeProps> = ({
  texts,
  ends,
  direction = "normal",
  speed = "15s",
  className = "",
  position,
}) => {
  const marqueeStyle = {
    animationDirection: direction,
    animationDuration: speed,
  };

  const baseClass =
    position === "top"
      ? "absolute top-0 left-0 w-full overflow-hidden bg-stone-200/10 backdrop-blur-sm"
      : "absolute bottom-0 left-0 w-full overflow-hidden";

  const textClass =
    position === "top"
      ? "text-sm font-mono py-2 px-4"
      : "text-xs font-mono py-1 px-4 opacity-40";

  return (
    <div className={baseClass}>
      <div
        className={`marquee ${textClass} whitespace-nowrap ${className}`}
        style={marqueeStyle}
      >
        {ends?.prefix} {texts.join(" • ")} • {texts.join(" • ")} {ends?.suffix}
      </div>
    </div>
  );
};

export default ScrollingMarquee;
