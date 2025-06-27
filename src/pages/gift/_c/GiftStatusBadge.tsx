import { GiftStatus } from "../../../react-query/gift/gift.types";

export function GiftStatusBadge({ status }: { status: GiftStatus }) {
  const base = "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";

  switch (status) {
    case GiftStatus.Pending:
      return (
        <span
          className={`${base} bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200
            dark:border-yellow-800`}
        >
          Pending
        </span>
      );

    case GiftStatus.Redeemed:
      return (
        <span
          className={`${base} bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200
            dark:border-green-800`}
        >
          Redeemed
        </span>
      );

    case GiftStatus.Revoked:
      return (
        <span
          className={`${base} bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800`}
        >
          Revoked
        </span>
      );

    default:
      return null;
  }
}
