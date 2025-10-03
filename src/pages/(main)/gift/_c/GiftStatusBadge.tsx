import { GiftStatus } from "../../../../features/gift/gift.types";

export function GiftStatusBadge({ status }: { status: GiftStatus }) {
  const base = "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";

  switch (status) {
    case GiftStatus.Pending:
      return (
        <span
          className={`${base} bg-yellow-200 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900`}
        >
          Pending
        </span>
      );

    case GiftStatus.Redeemed:
      return (
        <span
          className={`${base} bg-green-200 text-green-800 dark:bg-green-200 dark:text-green-900`}
        >
          Redeemed
        </span>
      );

    case GiftStatus.Revoked:
      return (
        <span className={`${base} bg-red-100 text-red-800  dark:bg-red-200 dark:text-red-900 `}>
          Revoked
        </span>
      );

    default:
      return null;
  }
}
