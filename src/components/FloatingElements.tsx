"use client";

import React from "react";

interface FloatingElementsProps {
  loaded: boolean;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ loaded }) => {
  const elements = [
    {
      className:
        "absolute top-1/2 left-1/4 lg:left-1/3 w-3 h-3 bg-stone-400/50",
      delay: "delay-1000",
    },
    {
      className: "absolute top-1/3 right-1/3 w-2 h-2 bg-stone-400/30",
      delay: "delay-1200",
    },
    {
      className: "absolute bottom-1/4 left-2/3 w-1 h-1 bg-stone-400/40",
      delay: "delay-1400",
    },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <div
          key={index}
          className={`${
            element.className
          } rounded-full transition-all duration-2000 ${element.delay} ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      ))}
    </>
  );
};

export default FloatingElements;
