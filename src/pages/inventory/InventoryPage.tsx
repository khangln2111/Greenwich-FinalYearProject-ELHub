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
      className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-lg hover:shadow-xl
        transition-shadow duration-300"
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
        <img src={item.courseImageUrl} alt={item.courseTitle} className="size-full object-cover" />
        {item.quantity > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs
              font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-md"
          >
            {item.quantity}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {item.courseTitle}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.courseDescription}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle
              className={`w-5 h-5 ${item.activated ? "text-green-500" : "text-gray-300"}`}
            />
            <span>{item.activated ? "Activated" : "Not Activated"}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onActivate(item.id)}
              disabled={!canActivate}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                canActivate
                  ? "bg-green-500 text-white hover:bg-green-600"
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
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90"
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
          ? {
              ...item,
              quantity: item.quantity - 1,
              activated: true,
            }
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
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"> Your Inventory</h1>

      <div className="space-y-6">
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
