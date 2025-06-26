import { useState } from "react";
import CenterLoader from "../../components/CenterLoader";
import { useGetInventoryItemsSelf } from "../../react-query/inventory/inventoryHooks";
import GiftingModal from "./_c/GiftingModal";
import InventoryItemCard from "./_c/InventoryItemCard";

export default function InventoryPage() {
  const { data, isPending, error } = useGetInventoryItemsSelf();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (isPending) return <CenterLoader />;

  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Inventory
      </h1>

      <div className="space-y-5">
        {data.items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Your inventory is empty.</p>
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
