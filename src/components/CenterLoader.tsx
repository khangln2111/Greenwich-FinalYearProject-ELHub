import { Loader } from "@mantine/core";

const CenterLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader size="xl" />
    </div>
  );
};
export default CenterLoader;
