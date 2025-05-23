"use client";

import React, { useState, useEffect } from "react";
import { CursorPosition } from "@/types";

interface CustomCursorProps {
  loaded: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ loaded }) => {
  const cursorSize = 12; // in pixels
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isInteractable, setIsInteractable] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Check if the hovered element is interactable
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button, a, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])")
      ) {
        setIsInteractable(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button, a, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])")
      ) {
        setIsInteractable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`fixed rounded-full bg-white z-50 transition-transform duration-300 ease-out pointer-events-none`}
      style={{
        width: cursorSize,
        height: cursorSize,
        left: cursorPos.x - cursorSize / 2,
        top: cursorPos.y - cursorSize / 2,
        mixBlendMode: "difference",
        transform: loaded
          ? isInteractable
            ? "scale(3)"
            : "scale(1)"
          : "scale(0)",
      }}
    />
  );
};

export default CustomCursor;
