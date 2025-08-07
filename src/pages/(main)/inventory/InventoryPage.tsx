import { useState } from "react";
import CenterLoader from "../../../components/CenterLoader";
import { useGetInventoryItemsSelf } from "../../../features/inventory/inventoryHooks";
import GiftingModal from "./_c/GiftingModal";
import InventoryItemCard from "./_c/InventoryItemCard";
import { PackageOpenIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function InventoryPage() {
  const { data, isPending, error } = useGetInventoryItemsSelf();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Inventory</h1>

      <div className="space-y-5">
        {data.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <PackageOpenIcon className="w-16 h-16 text-blue-500" />

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your inventory is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Looks like you haven't purchased any courses yet. Start exploring now and boost your
              learning journey!
            </p>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
                transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          data.items.map((item) => (
            <InventoryItemCard key={item.id} item={item} onGift={(id) => setSelectedItemId(id)} />
          ))
        )}
      </div>
      {selectedItemId && (
        <GiftingModal
          opened={!!selectedItemId}
          onClose={() => setSelectedItemId(null)}
          inventoryItemId={selectedItemId}
        />
      )}
    </div>
  );
}
