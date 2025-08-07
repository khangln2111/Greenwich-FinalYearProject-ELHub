import { Button } from "@mantine/core";
import { ReceivedGiftVm, GiftStatus } from "../../../features/gift/gift.types";
import { formatDate } from "../../../utils/format";
import { GiftStatusBadge } from "./GiftStatusBadge";

interface Props {
  gift: ReceivedGiftVm;
  onRedeem: (id: string) => void;
}

export function ReceivedGiftItemCard({ gift, onRedeem }: Props) {
  const dateLabel = gift.redeemedAt
    ? `Redeemed: ${formatDate({ input: gift.redeemedAt, formatType: "ddmmyyyy" })}`
    : `Received: ${formatDate({ input: gift.createdAt, formatType: "ddmmyyyy" })}`;

  return (
    <div
      className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow border flex flex-col gap-4 sm:flex-row
        sm:items-center sm:justify-between"
    >
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <img
          src={gift.giftImageUrl || "/placeholder.png"}
          alt="Gift"
          className="w-20 h-20 rounded object-cover border shrink-0"
        />
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-base font-semibold">{gift.giftName}</div>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="font-medium">From:</span> {gift.giverName} - {gift.giverEmail}
          </div>
          <div className="text-gray-400 text-xs">{dateLabel}</div>
          <div className="sm:hidden mt-2">
            <GiftStatusBadge status={gift.status} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 sm:gap-3">
        <div className="hidden sm:block">
          <GiftStatusBadge status={gift.status} />
        </div>
        {gift.status === GiftStatus.Pending && (
          <Button
            size="compact-sm"
            className="text-xs px-3 py-1 rounded"
            color="blue"
            onClick={() => onRedeem(gift.id)}
          >
            Redeem
          </Button>
        )}
      </div>
    </div>
  );
}
