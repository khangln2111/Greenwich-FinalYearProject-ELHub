import { Button } from "@mantine/core";
import { SentGiftVm, GiftStatus } from "../../../../features/gift/gift.types";
import { formatDate } from "../../../../utils/format";
import { GiftStatusBadge } from "./GiftStatusBadge";

interface Props {
  gift: SentGiftVm;
  onRevoke: (id: string) => void;
  onChangeReceiver: (gift: SentGiftVm) => void;
}

export function SentGiftItemCard({ gift, onRevoke, onChangeReceiver }: Props) {
  return (
    <div
      className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow border flex flex-col gap-4 sm:flex-row
        sm:items-center sm:justify-between"
    >
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <img
          src={gift.giftImageUrl || "/placeholder.png"}
          alt="Gift"
          className="size-20 rounded object-cover border shrink-0"
        />
        <div className="flex flex-col gap-1 text-sm">
          <div className="text-base font-semibold">{gift.giftName}</div>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="font-medium">To:</span> {gift.receiverEmail}
          </div>
          <div className="text-gray-400 text-xs">
            Sent: {formatDate({ input: gift.createdAt, formatType: "ddmmyyyy" })}
          </div>
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
          <div className="flex gap-2">
            <Button
              size="compact-sm"
              color="yellow"
              className="text-xs px-3 py-1 rounded"
              onClick={() => onChangeReceiver(gift)}
            >
              Change
            </Button>
            <Button
              size="compact-sm"
              color="red"
              className="text-xs px-3 py-1 rounded"
              onClick={() => onRevoke(gift.id)}
            >
              Revoke
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
