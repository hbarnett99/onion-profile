// GradientMesh.ts
import * as THREE from "three";

interface GradientMeshProps {
  color1: string;
  color2: string;
  color3: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv;
    float wave = sin(p.x * 10.0 + uTime * 0.5) * 0.1;
    float mix1 = smoothstep(0.0, 0.5 + wave, p.y);
    float mix2 = smoothstep(0.5 + wave, 1.0, p.y);

    vec3 color = mix(uColor1, uColor2, mix1);
    color = mix(color, uColor3, mix2);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const createGradientMesh = (
  { color1, color2, color3 }: GradientMeshProps,
  clock: THREE.Clock
): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(4, 2, 1, 1);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uColor3: { value: new THREE.Color(color3) },
      uTime: { value: 0 },
    },
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  const update = () => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  };

  // @ts-expect-error The AI says ok
  mesh.customUpdate = update;

  return mesh;
};

export const initGradientScene = (
  container: HTMLDivElement,
  colors: [string, string, string]
) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const gradientMesh = createGradientMesh(
    {
      color1: colors[0],
      color2: colors[1],
      color3: colors[2],
    },
    clock
  );

  scene.add(gradientMesh);

  const animate = () => {
    requestAnimationFrame(animate);

    // @ts-expect-error The AI says ok
    gradientMesh.customUpdate();
    renderer.render(scene, camera);
  };

  animate();
};
