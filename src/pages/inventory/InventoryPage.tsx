import { Gift, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useGetInventoryItemsSelf } from "../../react-query/inventory/inventoryHooks";
import CenterLoader from "../../components/CenterLoader";
import { InventoryItemVm } from "../../react-query/inventory/inventory.types";

function InventoryItemCard({
  item,
  onEnroll,
  onGift,
}: {
  item: InventoryItemVm;
  onEnroll?: (id: string) => void;
  onGift?: (id: string) => void;
}) {
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4
        sm:p-5 flex flex-col sm:flex-row gap-4"
    >
      <div
        className="w-full sm:w-28 h-44 sm:h-28 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700
          shadow-sm flex-shrink-0"
      >
        <img
          src={item.courseImageUrl}
          alt={item.courseTitle}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.courseTitle}
          </h3>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-br from-indigo-500 to-purple-500
              text-white shadow-sm w-fit"
          >
            Quantity: {item.quantity}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {item.courseDescription}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle
              className={`w-5 h-5 ${item.enrolled ? "text-green-500" : "text-gray-300"}`}
            />
            <span>{item.enrolled ? "Enrolled" : "Not Enrolled"}</span>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => onEnroll?.(item.id)}
              disabled={item.enrolled}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                !item.enrolled
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed"
                }`}
            >
              Enroll
            </button>
            <button
              onClick={() => onGift?.(item.id)}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium flex items-center gap-1 transition-all duration-200
                ${"bg-amber-400 hover:bg-amber-500 text-white"}`}
            >
              <Gift size={16} />
              Gift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const { data, isPending, error } = useGetInventoryItemsSelf();

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading orders: {error.message}</div>;

  console.log("Inventory items:", data.items);

  // const onEnroll = (id: string) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id && item.quantity > 0 && !item.enrolled
  //         ? { ...item, quantity: item.quantity - 1, enrolled: true }
  //         : item,
  //     ),
  //   );
  // };

  // const onGift = (id: string) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item,
  //     ),
  //   );
  // };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center sm:text-left">
        Your Inventory
      </h1>

      <div className="space-y-5">
        {data.items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Your inventory is empty.</p>
        ) : (
          data.items.map((item) => <InventoryItemCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
