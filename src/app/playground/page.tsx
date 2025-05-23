import GradientMesh2 from "@/components/GradientMesh2";

const Playground = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Playground</h1>
      <div className="h-12 w-24 flex">
      <GradientMesh2 />
      </div>
      <p className="mt-4 text-lg">This is a playground page.</p>
      <p className="mt-4 text-sm italic opacity-75">(if you found this page, damn buddy.)</p>
    </div>
  );
}
export default Playground;