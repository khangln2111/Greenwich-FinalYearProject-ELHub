import { useState } from "react";
import { GiftVm } from "../../react-query/gift/gift.types";
import { GiftTable } from "./_c/GiftTable";
import { RedeemGiftModal } from "./_c/RedeemGiftModal";

// ----- MOCK DATA -----
const mockSentGifts: GiftVm[] = [
  {
    id: "1",
    receiverEmail: "friend@example.com",
    giverName: "You",
    giftName: "Complete React Course",
    giftImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
    status: "Pending",
    createdAt: "2025-06-24T08:30:00Z",
  },
  {
    id: "2",
    receiverEmail: "teammate@example.com",
    giverName: "You",
    giftName: "TailwindCSS Mastery",
    giftImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
    status: "Redeemed",
    createdAt: "2025-06-20T10:00:00Z",
    redeemedAt: "2025-06-21T10:00:00Z",
  },
  {
    id: "3",
    receiverEmail: "oldfriend@example.com",
    giverName: "You",
    giftName: "C# Fundamentals",
    status: "Revoked",
    createdAt: "2025-06-15T09:00:00Z",
    revokedAt: "2025-06-16T11:00:00Z",
    giftImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
  },
];

const mockReceivedGifts: GiftVm[] = [
  {
    id: "4",
    receiverEmail: "you@example.com",
    giverName: "Alice Nguyen",
    giftName: "UI/UX Design Bootcamp",
    status: "Redeemed",
    createdAt: "2025-06-10T12:00:00Z",
    redeemedAt: "2025-06-11T14:00:00Z",
    giftImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
  },
  {
    id: "5",
    receiverEmail: "you@example.com",
    giverName: "Bob Tran",
    giftName: "Next.js Fullstack Guide",
    giftImageUrl: "https://source.unsplash.com/80x80/?nextjs,javascript",
    status: "Pending",
    createdAt: "2025-06-23T08:00:00Z",
  },
];

// ----- MAIN COMPONENT -----
export default function GiftsPage() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);

  const handleRevoke = (giftId: string) => {
    alert(`Revoke gift ID: ${giftId}`);
  };

  const handleChangeReceiver = (giftId: string) => {
    alert(`Change receiver for gift ID: ${giftId}`);
  };

  const handleRedeem = (giftId: string) => {
    alert(`Redeem gift ID: ${giftId}`);
  };

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎁 My Gifts</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-y-5">
        <div className="flex gap-x-4">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "sent" ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100" }`}
          >
            Sent
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "received" ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100" }`}
          >
            Received
          </button>
        </div>

        <button
          onClick={() => setRedeemModalOpen(true)}
          className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Redeem by Gift Code
        </button>
      </div>

      {activeTab === "sent" ? (
        <GiftTable
          gifts={mockSentGifts}
          canManage
          onRevoke={handleRevoke}
          onChangeReceiver={handleChangeReceiver}
        />
      ) : (
        <GiftTable gifts={mockReceivedGifts} onRedeem={handleRedeem} />
      )}

      <RedeemGiftModal open={redeemModalOpen} onClose={() => setRedeemModalOpen(false)} />
    </div>
  );
}
