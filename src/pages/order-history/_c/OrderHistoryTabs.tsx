type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["All", "Completed", "Incomplete", "Failed", "Refunded"];

export function OrderHistoryTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex gap-x-4 overflow-x-auto mt-4 bg-body rounded-t-xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`py-2 px-3 flex-1 ${
          activeTab === tab
              ? "border-b-2 font-medium border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
