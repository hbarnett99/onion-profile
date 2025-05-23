"use client";

import React, { useState, useEffect } from "react";
import { CursorPosition } from "@/types";

interface CustomCursorProps {
  loaded: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ loaded }) => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed w-4 h-4 rounded-full bg-white pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: cursorPos.x - 16,
        top: cursorPos.y - 16,
        mixBlendMode: "difference",
        transform: loaded ? "scale(1)" : "scale(0)",
      }}
    />
  );
};

export default CustomCursor;
