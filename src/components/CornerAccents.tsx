"use client";

import React from "react";

interface CornerAccentsProps {
  loaded: boolean;
}

const CornerAccents: React.FC<CornerAccentsProps> = ({ loaded }) => {
  return (
    <>
      <div
        className={`absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-stone-400/50 to-transparent transition-all duration-2000 delay-1500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-stone-400/50 to-transparent transition-all duration-2000 delay-1500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

export default CornerAccents;