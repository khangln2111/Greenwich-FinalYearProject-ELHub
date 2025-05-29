import { Gift, CheckCircle } from "lucide-react";
import { useState } from "react";

type InventoryItem = {
  id: string;
  courseTitle: string;
  courseDescription: string;
  courseImageUrl: string;
  quantity: number;
  activated: boolean;
};

function InventoryItemCard({
  item,
  onActivate,
  onGift,
}: {
  item: InventoryItem;
  onActivate: (id: string) => void;
  onGift: (id: string) => void;
}) {
  const canActivate = item.quantity > 0 && !item.activated;
  const canGift = item.quantity > 0;

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
              className={`w-5 h-5 ${item.activated ? "text-green-500" : "text-gray-300"}`}
            />
            <span>{item.activated ? "Activated" : "Not Activated"}</span>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => onActivate(item.id)}
              disabled={!canActivate}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                canActivate
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed"
                  }`}
            >
              Activate
            </button>
            <button
              onClick={() => onGift(item.id)}
              disabled={!canGift}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium flex items-center gap-1 transition-all duration-200 ${
                canGift
                  ? "bg-amber-400 hover:bg-amber-500 text-white"
                  : "bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed"
              }`}
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
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      courseTitle: "Modern React 2025",
      courseDescription: "Master React and build real-world apps with hooks, context and suspense.",
      courseImageUrl: "https://cloud.z.com/vn/wp-content/uploads/2023/06/Screenshot_12-5.png",
      quantity: 2,
      activated: false,
    },
    {
      id: "2",
      courseTitle: "TypeScript Pro Patterns",
      courseDescription: "Learn advanced TS patterns and scalable application design.",
      courseImageUrl:
        "https://images.ctfassets.net/23aumh6u8s0i/3auCWvEHRgMULidrkY6oQx/44b6f250f482dc75323130492e322746/TS.png",
      quantity: 1,
      activated: true,
    },
  ]);

  const onActivate = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0 && !item.activated
          ? { ...item, quantity: item.quantity - 1, activated: true }
          : item,
      ),
    );
  };

  const onGift = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center sm:text-left">
        Your Inventory
      </h1>

      <div className="space-y-5">
        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Your inventory is empty.</p>
        ) : (
          items.map((item) => (
            <InventoryItemCard key={item.id} item={item} onActivate={onActivate} onGift={onGift} />
          ))
        )}
      </div>
    </div>
  );
}
