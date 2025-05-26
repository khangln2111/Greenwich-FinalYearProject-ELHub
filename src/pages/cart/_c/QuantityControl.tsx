import { NumberInput } from "@mantine/core";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../../utils/cn";

type QuantityControlProps = {
  quantity: number;
  onChange: (delta: number) => void;
  className?: string;
};

export default function QuantityControl({ quantity, onChange, className }: QuantityControlProps) {
  return (
    <div
      className={cn(
        `inline-flex items-center border rounded-md overflow-hidden divide-x divide-gray-200
        dark:divide-gray-700 h-8`,
        className,
      )}
    >
      <button
        onClick={() => onChange(-1)}
        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100
          dark:hover:bg-gray-800"
      >
        <Minus size={16} />
      </button>

      <NumberInput
        hideControls
        radius={0}
        min={1}
        className="w-9"
        classNames={{
          input: "focus-within:border-default-border text-center size-full p-0 font-medium",
        }}
        value={quantity}
        onChange={(value) => onChange(Number(value) - quantity)}
      />
      <button
        onClick={() => onChange(1)}
        className="w-8 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100
          dark:hover:bg-gray-800"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
