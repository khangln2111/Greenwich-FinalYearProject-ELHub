import { LayoutGrid, List } from "lucide-react";

type LayoutMode = "grid" | "list";

export default function LayoutToggle({
  value,
  onChange,
}: {
  value: LayoutMode;
  onChange: (mode: LayoutMode) => void;
}) {
  return (
    <div className="flex items-center bg-gray-400 rounded-full p-1 w-[80px] justify-between">
      {/* Grid button */}
      <button
        onClick={() => onChange("grid")}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          value === "grid" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300/70" }`}
      >
        <LayoutGrid size={16} />
      </button>

      {/* List button */}
      <button
        onClick={() => onChange("list")}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          value === "list" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300/70" }`}
      >
        <List size={16} />
      </button>
    </div>
  );
}
