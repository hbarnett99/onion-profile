const constCSS = `
.gradient-mesh2-root {
  --_noise-texture: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><defs><filter id='n' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='3' stitchTiles='stitch' result='t'/><feColorMatrix type='saturate' values='0' in='t' result='g'/><feComponentTransfer in='g' result='a'><feFuncA type='linear' slope='0.5'/></feComponentTransfer></filter></defs><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  --_noise-size: 19%;
  --_gradient-blend-mode: normal;
  --_gradient-blur: 0px;
  --_gradient: radial-gradient(at 47% 66%, #0debf3 0px, transparent 50%), radial-gradient(at 47% 7%, #0d78f3 0px, transparent 50%), radial-gradient(at 67% 56%, #150df3 0px, transparent 50%);
}

.gradient-mesh2-root {
  background: var(--_gradient) #7f90be;
  mix-blend-mode: var(--_gradient-blend-mode);
  filter: blur(var(--_gradient-blur));
  backdrop-filter: blur(var(--_gradient-blur));
  -webkit-backdrop-filter: blur(var(--_gradient-blur));
}

.gradient-mesh2-root .noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: var(--_noise-texture);
  background-size: var(--_noise-size);
  background-position: center;
  background-repeat: repeat;
  pointer-events: none;
  z-index: 1;
}
`;

const GradientMesh2 = () => {
const className = "gradient-mesh2-root h-full w-full float-2";

  return (
    <div className="absolute inset-0 z-[-1] h-[196px] w-[384px] left-[-180px] top-[40%] sm:left-[-90px]">
      <div className={className}>
        <style>{constCSS}</style>
        <div className="noise" />
      </div>
    </div>
  );
}
export default GradientMesh2;