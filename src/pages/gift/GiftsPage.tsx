import { useState } from "react";
import { GiftVm } from "../../react-query/gift/gift.types";
import { formatDate } from "../../utils/format";

const mockSentGifts: GiftVm[] = [
  {
    id: "1",
    receiverEmail: "friend@example.com",
    giverName: "You",
    inventoryItemName: "Complete React Course",
    inventoryItemImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
    status: "Pending",
    createdAt: "2025-06-24T08:30:00Z",
  },
  {
    id: "2",
    receiverEmail: "teammate@example.com",
    giverName: "You",
    inventoryItemName: "TailwindCSS Mastery",
    inventoryItemImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
    status: "Redeemed",
    createdAt: "2025-06-20T10:00:00Z",
    redeemedAt: "2025-06-21T10:00:00Z",
  },
  {
    id: "3",
    receiverEmail: "oldfriend@example.com",
    giverName: "You",
    inventoryItemName: "C# Fundamentals",
    status: "Revoked",
    createdAt: "2025-06-15T09:00:00Z",
    revokedAt: "2025-06-16T11:00:00Z",
    inventoryItemImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
  },
];

const mockReceivedGifts: GiftVm[] = [
  {
    id: "4",
    receiverEmail: "you@example.com",
    giverName: "Alice Nguyen",
    inventoryItemName: "UI/UX Design Bootcamp",
    status: "Redeemed",
    createdAt: "2025-06-10T12:00:00Z",
    redeemedAt: "2025-06-11T14:00:00Z",
    inventoryItemImageUrl:
      "https://ramonoutdoors.com/wp-content/uploads/2024/07/types-of-sunfish-1024x576.jpg",
  },
  {
    id: "5",
    receiverEmail: "you@example.com",
    giverName: "Bob Tran",
    inventoryItemName: "Next.js Fullstack Guide",
    inventoryItemImageUrl: "https://source.unsplash.com/80x80/?nextjs,javascript",
    status: "Pending",
    createdAt: "2025-06-23T08:00:00Z",
  },
];

export default function GiftsPage() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");

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
    <div className="mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎁 My Gifts</h1>

      <div className="flex justify-center space-x-4 mb-8">
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
    </div>
  );
}

function GiftTable({
  gifts,
  canManage = false,
  onRevoke,
  onChangeReceiver,
  onRedeem,
}: {
  gifts: GiftVm[];
  canManage?: boolean;
  onRevoke?: (id: string) => void;
  onChangeReceiver?: (id: string) => void;
  onRedeem?: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          {/* LEFT: Image + Info */}
          <div className="flex items-center gap-4 flex-1">
            {gift.inventoryItemImageUrl ? (
              <img
                src={gift.inventoryItemImageUrl}
                alt="Course"
                className="size-17 rounded object-cover border"
              />
            ) : (
              <div className="size-17 bg-gray-200 rounded" />
            )}
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold">{gift.inventoryItemName}</div>
              <div className="text-sm text-gray-500">
                {canManage ? (
                  <>
                    <span className="font-medium">To:</span> {gift.receiverEmail}
                  </>
                ) : (
                  <>
                    <span className="font-medium">From:</span> {gift.giverName}
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {canManage
                  ? `Sent: ${formatDate({
                      input: gift.createdAt,
                      formatType: "ddmmyyyy",
                    })}`
                  : gift.redeemedAt
                    ? `Redeemed: ${formatDate({
                        input: gift.redeemedAt,
                        formatType: "ddmmyyyy",
                      })}`
                    : `Received: ${formatDate({
                        input: gift.createdAt,
                        formatType: "ddmmyyyy",
                      })}`}
              </div>
            </div>
          </div>

          {/* RIGHT: Status + Actions */}
          <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-3">
            <StatusBadge status={gift.status} />

            {canManage && gift.status === "Pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onRevoke?.(gift.id)}
                  className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Revoke
                </button>
                <button
                  onClick={() => onChangeReceiver?.(gift.id)}
                  className="text-xs px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Change
                </button>
              </div>
            )}

            {!canManage && gift.status === "Pending" && (
              <button
                onClick={() => onRedeem?.(gift.id)}
                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Redeem
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: GiftVm["status"] }) {
  const base = "px-2 py-0.5 rounded-full text-xs font-medium";
  switch (status) {
    case "Pending":
      return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
    case "Redeemed":
      return <span className={`${base} bg-green-100 text-green-800`}>Redeemed</span>;
    case "Revoked":
      return <span className={`${base} bg-red-100 text-red-800`}>Revoked</span>;
    default:
      return null;
  }
}
