"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// Type definitions
interface CursorPosition {
  x: number;
  y: number;
}

interface ShootingStar {
  position: THREE.Vector3;
  trail: THREE.Vector3[];
  maxTrailLength: number;
  amplitudeX: number;
  amplitudeY: number;
  amplitudeZ: number;
  frequencyX: number;
  frequencyY: number;
  frequencyZ: number;
  phaseX: number;
  phaseY: number;
  phaseZ: number;
  timeOffset: number;
  speed: number;
  starMesh: THREE.Mesh | null;
  trailMesh: THREE.Line | null;
}

const AudioReactiveOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Invisible/transparent central orb
    const orbGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.1,
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // Create fewer stars with smooth, flowing trails
    const numStars = 8;
    const shootingStars: ShootingStar[] = [];

    for (let i = 0; i < numStars; i++) {
      const star: ShootingStar = {
        position: new THREE.Vector3(),
        trail: [],
        maxTrailLength: 100,
        amplitudeX: 1.8 + Math.random() * 0.4,
        amplitudeY: 1.8 + Math.random() * 0.4,
        amplitudeZ: 1.2 + Math.random() * 0.6,
        frequencyX: 0.8 + Math.random() * 0.4,
        frequencyY: 0.6 + Math.random() * 0.6,
        frequencyZ: 0.5 + Math.random() * 0.3,
        phaseX: i * Math.PI * 0.7,
        phaseY: i * Math.PI * 0.5,
        phaseZ: i * Math.PI * 0.3,
        timeOffset: i * 1.2,
        speed: 0.04 + Math.random() * .1 * 10,
        starMesh: null,
        trailMesh: null,
      };

      // Create the star
      const starGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9,
      });
      star.starMesh = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(star.starMesh);

      // Create trail geometry
      const trailGeometry = new THREE.BufferGeometry();
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.7,
        linewidth: 3,
      });

      const trailPositions = new Float32Array(star.maxTrailLength * 3);
      trailGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(trailPositions, 3)
      );

      star.trailMesh = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(star.trailMesh);

      shootingStars.push(star);
    }

    camera.position.z = 5;

    // Store references
    sceneRef.current = scene;
    orbRef.current = orb;
    shootingStarsRef.current = shootingStars;
    rendererRef.current = renderer;

    // Animation loop
    const animate = (): void => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update each star
      shootingStarsRef.current.forEach((star: ShootingStar) => {
        const starTime = time * star.speed + star.timeOffset;

        const x =
          star.amplitudeX * Math.sin(star.frequencyX * starTime + star.phaseX);
        const y =
          star.amplitudeY * Math.cos(star.frequencyY * starTime + star.phaseY);
        const z =
          star.amplitudeZ *
          Math.sin(star.frequencyZ * starTime + star.phaseZ) *
          0.5;

        star.position.set(x, y, z);
        if (star.starMesh) {
          star.starMesh.position.copy(star.position);

          (star.starMesh.material as THREE.MeshBasicMaterial).opacity = 0.8;
          (star.starMesh.material as THREE.MeshBasicMaterial).color.setHSL(
            0.55,
            0.9,
            0.8
          );
          star.starMesh.scale.setScalar(1.0);
        }

        // Update trails
        if (star.trail.length === 0) {
          star.trail.push(star.position.clone());
        } else {
          const lastPos = star.trail[star.trail.length - 1];
          const distance = star.position.distanceTo(lastPos);

          if (distance > 0.01) {
            star.trail.push(star.position.clone());
            if (star.trail.length > star.maxTrailLength) {
              star.trail.shift();
            }
          }
        }

        if (star.trailMesh) {
          const positions = star.trailMesh.geometry.attributes.position
            .array as Float32Array;
          for (let i = 0; i < star.maxTrailLength; i++) {
            if (i < star.trail.length) {
              const point = star.trail[i];
              positions[i * 3] = point.x;
              positions[i * 3 + 1] = point.y;
              positions[i * 3 + 2] = point.z;
            } else {
              const firstPoint = star.trail[0] || star.position;
              positions[i * 3] = firstPoint.x;
              positions[i * 3 + 1] = firstPoint.y;
              positions[i * 3 + 2] = firstPoint.z;
            }
          }
          star.trailMesh.geometry.attributes.position.needsUpdate = true;

          (star.trailMesh.material as THREE.MeshBasicMaterial).opacity = 0.5;
          (star.trailMesh.material as THREE.LineBasicMaterial).color.setHSL(
            0.55,
            0.9,
            0.7
          );
        }
      });

      if (orbRef.current) {
        (orbRef.current.material as THREE.MeshBasicMaterial).opacity = 0.05;
        orbRef.current.scale.setScalar(1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={mountRef}
        className="w-[300px] h-[300px] rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(0,170,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 rounded-full border border-cyan-400/20"></div>
    </div>
  );
};

const OnionStyleProfile: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleMouseMove = (e: MouseEvent): void => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollingTexts: string[] = [
    "FULL SITE IS COOKIN...BRING TISSUES",
    "DESIGN SO GOOD IT MAKES YOU CRY",
    "CREATIVE STUDIO EXTRAORDINAIRE",
    "BRANDING THAT HITS DIFFERENT",
  ];

  return (
    <div className="h-screen w-full bg-gray-900 text-stone-200 overflow-hidden relative cursor-none">
      {/* Background gradient */}
      <div className=""></div>

      {/* Large Background "ONION" Text
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className={`text-[25rem] font-black text-stone-800/15 leading-none transform transition-all duration-3000 ${
            loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          style={{ fontFamily: "Arial Black, sans-serif" }}
        >
          ONION
        </div>
      </div> */}

      {/* Scrolling Text at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden bg-stone-200/10 backdrop-blur-sm">
        <div
          className={`marquee text-sm font-mono py-2 px-4 whitespace-nowrap transition-all duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {scrollingTexts.join(" • ")} • {scrollingTexts.join(" • ")}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-12 pt-16 max-w-7xl mx-auto">
        {/* Top Corner Elements */}
        <div className="absolute top-8 right-12 lg:right-24">
          <div
            className={`text-sm font-mono opacity-60 transform transition-all duration-1500 ${
              loaded ? "translate-y-0 opacity-60" : "translate-y-5 opacity-0"
            }`}
          >
            (IG,X,LI,AWWW)
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-6 mt-16">
          <div
            className={`transform transition-all duration-1500 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-sm tracking-wider font-light opacity-70 mb-2">
              onion studio
            </div>
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="space-y-8 -mt-20">
          {/* Main Tagline - Top Right */}
          <div className="absolute top-1/3 right-12 lg:right-24">
            <div
              className={`transform transition-all duration-2000 delay-500 ${
                loaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="text-right text-lg lg:text-xl font-mono leading-tight">
                <div>DESIGN SO</div>
                <div>GOOD IT MAKES</div>
                <div>YOU CRY</div>
              </div>
            </div>
          </div>

          {/* Flowing Light Orb */}
          <div className="absolute top-1/2 right-24 lg:right-32 transform -translate-y-1/2">
            <div
              className={`transform transition-all duration-2000 delay-800 ${
                loaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <AudioReactiveOrb />
            </div>
          </div>

          {/* Main Brand Name */}
          <div
            className={`transform transition-all duration-2000 delay-300 ${
              loaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h1 className="text-7xl lg:text-8xl font-black leading-tight text-stone-200 float">
              <div>Henry</div>
              <div>Barnett</div>
              <div className="text-5xl">Full Stack Dev</div>
            </h1>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Bottom Left - Time */}
          <div
            className={`transform transition-all duration-1500 delay-1200 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="text-4xl font-mono font-bold">
              {formatTime(currentTime).replace(":", " ")}
            </div>
          </div>

          {/* Bottom Right - Call to Action */}
          <div
            className={`transform transition-all duration-1500 delay-1500 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="text-right space-y-2">
              <div className="text-lg font-mono">LETS TALK SOON</div>
              <div className="text-sm opacity-70 max-w-48">
                UNDER CONSTRUCTION
                <br />
                <div className="text-xs opacity-70">SEE YOU SOON</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className={`absolute top-1/2 left-1/4 lg:left-1/3 w-3 h-3 bg-stone-400/50 rounded-full transition-all duration-2000 delay-1000 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      ></div>
      <div
        className={`absolute top-1/3 right-1/3 w-2 h-2 bg-stone-400/30 rounded-full transition-all duration-2000 delay-1200 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      ></div>
      <div
        className={`absolute bottom-1/4 left-2/3 w-1 h-1 bg-stone-400/40 rounded-full transition-all duration-2000 delay-1400 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      ></div>

      {/* Subtle Corner Accents */}
      <div
        className={`absolute bottom-0 left-0 w-px h-32 bg-gradient-to-t from-stone-400/50 to-transparent transition-all duration-2000 delay-1500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-stone-400/50 to-transparent transition-all duration-2000 delay-1500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Scrolling Text at Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div
          className={`marquee text-xs font-mono py-1 px-4 whitespace-nowrap opacity-40 transition-all duration-1000 delay-2000 ${
            loaded ? "opacity-40" : "opacity-0"
          }`}
          style={{ animationDirection: "reverse", animationDuration: "20s" }}
        >
          FRONT END • BACK END • FULL STACK • ELECTRONIC MUSICIAN
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-white pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: cursorPos.x - 16,
          top: cursorPos.y - 16,
          mixBlendMode: "difference",
          transform: loaded ? "scale(1)" : "scale(0)",
        }}
      />
    </div>
  );
};

export default OnionStyleProfile;
