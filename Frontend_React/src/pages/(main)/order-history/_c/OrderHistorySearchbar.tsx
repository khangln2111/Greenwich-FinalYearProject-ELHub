import { SearchIcon } from "lucide-react";

export function OrderHistorySearchbar() {
  return (
    <div className="relative mb-4 flex-1">
      <input
        type="text"
        placeholder="Search by name, order ID or product..."
        className="w-full border rounded-full py-2 px-4 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500
          focus:outline-none"
      />
      <SearchIcon className="absolute left-3 top-2.5 text-gray-400 size-5" />
    </div>
  );
}
