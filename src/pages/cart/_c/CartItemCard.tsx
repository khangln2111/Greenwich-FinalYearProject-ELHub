import { ActionIcon, Checkbox, Text } from "@mantine/core";
import { Trash2 } from "lucide-react";
import QuantityControl from "./QuantityControl";

import { CartItem } from "../../../react-query/cart/cart.types";
import { cn } from "../../../utils/cn";

type CartItemCardProps = {
  item: CartItem;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  checked: boolean;
  onToggle: (id: string) => void;
  className?: string;
};

export default function CartItemCard({
  item,
  onChangeQuantity,
  onRemove,
  checked,
  onToggle,
  className,
}: CartItemCardProps) {
  return (
    <div className={cn("flex items-start border-t pt-4 gap-4", className)}>
      <div className="flex gap-5 items-center">
        <Checkbox checked={checked} onChange={() => onToggle(item.id)} />
        <img
          src={item.courseImageUrl}
          alt={item.courseTitle}
          className="size-20 object-cover rounded-md border"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2 lg:flex-row lg:gap-4 lg:self-stretch lg:items-center">
        <div className="flex lg:block items-center">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center gap-1 text-sm md:items-end md:text-md lg:gap-0 lead">
              <p className="font-medium">{item.courseTitle}</p>
              <Trash2
                className="text-dimmed cursor-pointer lg:hidden shrink-0 size-[18px] md:size-[20px]"
                onClick={() => onRemove(item.id)}
                size={20}
              />
            </div>
            <p className="text-sm text-gray-500 line-clamp-1">{item.courseDescription}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 lg:self-center">
          <div className="flex flex-row items-baseline gap-3 lg:gap-1 lg:flex-col lg:items-end lg:self-center">
            <Text className="text-blue-500 font-semibold">
              ${item.discountedPrice.toLocaleString("en-US")}
            </Text>
            {item.discountedPrice < item.price && (
              <Text className="text-sm text-dimmed font-semibold line-through">
                ${item.price.toLocaleString("en-US")}
              </Text>
            )}
          </div>

          <QuantityControl
            quantity={item.quantity}
            onChange={(delta) => onChangeQuantity(item.id, delta)}
          />
          <ActionIcon variant="subtle" color="gray" className="hidden lg:block self-center">
            <Trash2 className="cursor-pointer" onClick={() => onRemove(item.id)} size={20} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}
