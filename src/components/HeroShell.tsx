import { useState, useEffect } from "react";
import CallToAction from "./CallToAction";
import GradientMesh2 from "./GradientMesh2";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TimeDisplay from "./TimeDisplay";

const HeroShell = ({ loaded }: { loaded: boolean }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const parallaxMultiplier = -2.5;

  const parallaxStyle = {
    transform: `
              perspective(1000px)
              rotateX(${parallax.y * parallaxMultiplier}deg)
              rotateY(${-parallax.x * parallaxMultiplier}deg)
            `,
    transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div className="relative z-10 h-full flex flex-col justify-between p-12 pt-16 max-w-7xl mx-auto">
      {/* Header */}
      <Header loaded={loaded} />

      {/* Center Hero Section */}
      <div style={parallaxStyle}>
        <div style={parallaxStyle}>
          <HeroSection loaded={loaded} />
        </div>
        <GradientMesh2 />
      </div>
      {/* Bottom Section */}
      <div className="flex justify-between items-end">
        <TimeDisplay loaded={loaded} />
        <CallToAction loaded={loaded} />
      </div>
    </div>
  );
};
export default HeroShell;
