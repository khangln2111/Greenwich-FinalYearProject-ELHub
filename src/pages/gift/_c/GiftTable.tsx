import { Button } from "@mantine/core";
import {
  SentGiftVm,
  ReceivedGiftVm,
  GiftStatus,
  GiftVm,
} from "../../../react-query/gift/gift.types";
import { formatDate } from "../../../utils/format";

interface GiftTableProps {
  gifts: (SentGiftVm | ReceivedGiftVm)[];
  canManage?: boolean;
  onRevoke?: (id: string) => void;
  onChangeReceiver?: (id: string) => void;
  onRedeem?: (id: string) => void;
}

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
          className="bg-white p-4 rounded-xl shadow border flex flex-col gap-4 sm:flex-row sm:items-center
            sm:justify-between"
        >
          {/* Info Section */}
          <div className="flex items-start sm:items-center gap-4 flex-1">
            <img
              src={gift.giftImageUrl || "/placeholder.png"}
              alt="Gift"
              className="w-20 h-20 rounded object-cover border shrink-0"
            />
            <div className="flex flex-col gap-1 text-sm">
              <div className="text-base font-semibold">{gift.giftName}</div>
              <div className="text-gray-500">
                {canManage ? (
                  <>
                    <span className="font-medium">To:</span>{" "}
                    {"receiverEmail" in gift ? gift.receiverEmail : "-"}
                  </>
                ) : (
                  <>
                    <span className="font-medium">From:</span>{" "}
                    {"giverName" in gift ? `${gift.giverName} - ${gift.giverEmail}` : "-"}
                  </>
                )}
              </div>
              <div className="text-gray-400 text-xs">
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
              {/* Status on mobile */}
              <div className="sm:hidden mt-2">
                <StatusBadge status={gift.status} />
              </div>
            </div>
          </div>

          {/* Actions + Status */}
          <div className="flex flex-col items-end gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <StatusBadge status={gift.status} />
            </div>

            {canManage && gift.status === GiftStatus.Pending && (
              <div className="flex gap-2">
                <Button
                  size="compact-sm"
                  onClick={() => onChangeReceiver?.(gift.id)}
                  color="yellow"
                  className="text-xs px-3 py-1"
                >
                  Change
                </Button>
                <Button
                  size="compact-sm"
                  onClick={() => onRevoke?.(gift.id)}
                  color="red"
                  className="text-xs px-3 py-1"
                >
                  Revoke
                </Button>
              </div>
            )}

            {!canManage && gift.status === GiftStatus.Pending && (
              <Button
                size="compact-sm"
                onClick={() => onRedeem?.(gift.id)}
                color="blue"
                className="text-xs px-3 py-1"
              >
                Redeem
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: GiftVm["status"] }) {
  const base = "px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap";
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
