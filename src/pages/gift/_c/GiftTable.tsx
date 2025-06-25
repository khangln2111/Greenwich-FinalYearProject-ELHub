import { GiftVm } from "../../../react-query/gift/gift.types";
import { formatDate } from "../../../utils/format";

type GiftTableProps = {
  gifts: GiftVm[];
  canManage?: boolean;
  onRevoke?: (id: string) => void;
  onChangeReceiver?: (id: string) => void;
  onRedeem?: (id: string) => void;
};

export function GiftTable({
  gifts,
  canManage = false,
  onRevoke,
  onChangeReceiver,
  onRedeem,
}: GiftTableProps) {
  return (
    <div className="space-y-4">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-4 flex-1">
            {gift.giftImageUrl ? (
              <img
                src={gift.giftImageUrl}
                alt="Course"
                className="size-17 rounded object-cover border"
              />
            ) : (
              <div className="size-17 bg-gray-200 rounded" />
            )}
            <div className="flex flex-col gap-1">
              <div className="text-base font-semibold">{gift.giftName}</div>
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

          <div className="flex flex-row md:flex-col items-center justify-between md:items-end gap-3">
            <StatusBadge status={gift.status} />

            {canManage && gift.status === "Pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => onChangeReceiver?.(gift.id)}
                  className="text-xs px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Change
                </button>
                <button
                  onClick={() => onRevoke?.(gift.id)}
                  className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Revoke
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
