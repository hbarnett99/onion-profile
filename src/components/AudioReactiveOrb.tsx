// components/AudioReactiveOrb.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ShootingStar } from "@/types";

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
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
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
    const numStars = 12;
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
        speed: 0.04 + Math.random() * 0.1 * 10,
        starMesh: null,
        trailMesh: null,
      };

      // Create the star with glow
      const starGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 1.0,
      });
      star.starMesh = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(star.starMesh);

      // Add outer glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      star.starMesh.add(glowSphere);

      // Create trail geometry with glow effect
      const trailGeometry = new THREE.BufferGeometry();

      // Main trail with additive blending for glow
      const trailMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        linewidth: 1,
      });

      const trailPositions = new Float32Array(star.maxTrailLength * 3);
      trailGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(trailPositions, 3)
      );

      star.trailMesh = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(star.trailMesh);

      // Create additional glow layers
      const glowLayers = 3;
      for (let j = 0; j < glowLayers; j++) {
        const glowGeometry = new THREE.BufferGeometry();
        const glowPositions = new Float32Array(star.maxTrailLength * 3);
        glowGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(glowPositions, 3)
        );

        const glowMaterial = new THREE.LineBasicMaterial({
          color: j === 0 ? 0x00ffff : j === 1 ? 0x00aaff : 0x0066ff,
          transparent: true,
          opacity: 0.3 - j * 0.08,
          blending: THREE.AdditiveBlending,
          linewidth: 1,
        });

        const glowMesh = new THREE.Line(glowGeometry, glowMaterial);
        scene.add(glowMesh);

        // Store reference to glow mesh
        if (!star.glowMeshes) star.glowMeshes = [];
        star.glowMeshes.push(glowMesh);
      }

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

          // Pulsing star glow
          const pulse = 0.8 + Math.sin(time * 4 + star.phaseX) * 0.2;
          (star.starMesh.material as THREE.MeshBasicMaterial).opacity = pulse;
          (star.starMesh.material as THREE.MeshBasicMaterial).color.setHSL(
            0.5 + Math.sin(time) * 0.05,
            0.9,
            0.9
          );
          star.starMesh.scale.setScalar(pulse);

          // Update child glow sphere
          if (star.starMesh.children[0]) {
            star.starMesh.children[0].scale.setScalar(
              1.2 + Math.sin(time * 3) * 0.3
            );
          }
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

        // Update main trail mesh
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

          // Pulsing glow effect
          const glowIntensity = 0.6 + Math.sin(time * 3 + star.phaseX) * 0.3;
          (star.trailMesh.material as THREE.LineBasicMaterial).opacity =
            glowIntensity;
          (star.trailMesh.material as THREE.LineBasicMaterial).color.setHSL(
            0.5 + Math.sin(time * 0.5) * 0.05,
            0.9,
            0.8
          );
        }

        // Update glow layers with slight offset
        if (star.glowMeshes) {
          star.glowMeshes.forEach((glowMesh, glowIndex) => {
            const positions = glowMesh.geometry.attributes.position
              .array as Float32Array;
            const offset = (glowIndex + 1) * 0.02;

            for (let i = 0; i < star.maxTrailLength; i++) {
              if (i < star.trail.length) {
                const point = star.trail[i];
                // Add slight offset to create thickness
                positions[i * 3] =
                  point.x + Math.sin(time * 2 + i * 0.1) * offset;
                positions[i * 3 + 1] =
                  point.y + Math.cos(time * 2 + i * 0.1) * offset;
                positions[i * 3 + 2] = point.z;
              } else {
                const firstPoint = star.trail[0] || star.position;
                positions[i * 3] = firstPoint.x;
                positions[i * 3 + 1] = firstPoint.y;
                positions[i * 3 + 2] = firstPoint.z;
              }
            }
            glowMesh.geometry.attributes.position.needsUpdate = true;

            // Fade opacity based on trail position
            const baseOpacity = 0.3 - glowIndex * 0.08;
            (glowMesh.material as THREE.LineBasicMaterial).opacity =
              baseOpacity * (0.7 + Math.sin(time * 4 + star.phaseY) * 0.3);
          });
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
            "radial-gradient(circle, rgba(0,170,255,0.15) 0%, rgba(0,100,200,0.05) 40%, transparent 70%)",
          boxShadow:
            "0 0 100px rgba(0,170,255,0.2), inset 0 0 50px rgba(0,170,255,0.1)",
        }}
      />
      <div className="absolute inset-0 rounded-full border border-cyan-400/30"></div>
    </div>
  );
};

export default AudioReactiveOrb;
