// GradientBackground.tsx
import { initGradientScene } from "@/utils/GradientMesh";
import React, { useRef, useEffect } from "react";

interface GradientBackgroundProps {
  color1: string;
  color2: string;
  color3: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  color1,
  color2,
  color3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      initGradientScene(containerRef.current, [color1, color2, color3]);
    }
  }, [color1, color2, color3]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    />
  );
};

export default GradientBackground;
