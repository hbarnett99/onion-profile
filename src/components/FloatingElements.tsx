"use client";

import React from "react";

interface FloatingElementsProps {
  loaded: boolean;
}

const NUM_FIREFLIES = 40;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ loaded }) => {
  const elements = loaded ? Array.from({ length: NUM_FIREFLIES }).map((_, i) => {
    // Random positions and animation durations
    const top = randomBetween(5, 85);
    const left = randomBetween(5, 85);
    const size = randomBetween(0.8, 1.5); // slightly larger core
    const duration = randomBetween(4, 10);
    const delay = randomBetween(2, 6);
    const animation = `firefly${(i % 3) + 1}`;
    const coreColor = `rgb(190 230 255)`; // sharper, more opaque core

    return {
      style: {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        background: coreColor,
        animation: `${animation} ${duration}s ease-in-out ${delay}s infinite alternate`,
        // Reduced the glow size by lowering the blur radius
        // boxShadow: `0 0 ${size * 2.5}px 1px ${glowColor}, 0 0 2px 1px ${coreColor}`,
        pointerEvents: "none" as const,
        opacity: loaded ? 1 : 0,
        position: "absolute" as const,
        borderRadius: "9999px",
        transition: "opacity 2s, transform 2s",
      },
      key: i,
    };
  }) : [];

  return (
    <>
      <style>
        {`
          @keyframes firefly1 {
            0%   { transform: translate(0,0) scale(1); opacity: 0; }
            10%  { opacity: 1;  }
            20%  { transform: translate(-12px, -18px) scale(1.2); opacity: 0.7; }
            40%  { transform: translate(10px, -10px) scale(0.9); opacity: 0.2; }
            60%  { transform: translate(-5px, 10px) scale(1.05); opacity: 1; }
            80%  { transform: translate(15px, 5px) scale(1); opacity: 0.1; }
            100% { transform: translate(0,0) scale(1); opacity: 0; }
          }
          @keyframes firefly2 {
            0%   { transform: translate(0,0) scale(1); opacity: 0; }
            15%  { opacity: 1; }
            25%  { transform: translate(12px, -8px) scale(1.1); opacity: 0.4; }
            50%  { transform: translate(-8px, 12px) scale(0.95); opacity: 0.1; }
            75%  { transform: translate(8px, -12px) scale(1.05); opacity: 1; }
            100% { transform: translate(0,0) scale(1); opacity: 0; }
          }
          @keyframes firefly3 {
            0%   { transform: translate(0,0) scale(1); opacity: 0; }
            20%  { opacity: 1; }
            30%  { transform: translate(-6px, 10px) scale(1.1); opacity: 0.2; }
            60%  { transform: translate(10px, -6px) scale(0.9); opacity: 0.9; }
            90%  { transform: translate(-10px, 6px) scale(1.05); opacity: 0.1; }
            100% { transform: translate(0,0) scale(1); opacity: 0; }
          }
        `}
      </style>
      <div className="pointer-events-none fixed inset-0 w-full h-full z-0 opacity-80">
        {elements.map((element) => (
          <div key={element.key} style={element.style} />
        ))}
      </div>
    </>
  );
};

export default FloatingElements;
