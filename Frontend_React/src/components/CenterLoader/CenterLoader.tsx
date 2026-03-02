import { Loader } from "@mantine/core";

interface CenterLoaderProps {
  loadingText?: string;
  height?: number | string;
  className?: string;
}

const CenterLoader = ({ loadingText, height = 350, className = "" }: CenterLoaderProps) => {
  const resolvedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`grid place-items-center w-full text-center ${className}`}
      style={{ minHeight: resolvedHeight }}
    >
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <Loader size="xl" />
        {loadingText && <p className="text-sm">{loadingText}</p>}
      </div>
    </div>
  );
};

export default CenterLoader;
