import { ReactNode } from "react";

interface GiftListProps<T> {
  items: T[] | undefined;
  pending: boolean;
  renderItem: (item: T) => ReactNode;
  emptyState: ReactNode;
  skeleton?: ReactNode;
}

export function GiftList<T>({
  items,
  pending,
  renderItem,
  emptyState,
  skeleton,
}: GiftListProps<T>) {
  if (pending) {
    return <div className="space-y-4">{skeleton}</div>;
  }

  if (!items || items.length === 0) {
    return <>{emptyState}</>;
  }

  return <div className="space-y-4">{items.map(renderItem)}</div>;
}
