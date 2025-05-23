import * as THREE from "three";

export interface CursorPosition {
  x: number;
  y: number;
}

export interface ShootingStar {
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
  glowMeshes?: THREE.Line[];
}
