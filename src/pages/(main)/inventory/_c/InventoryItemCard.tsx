import { Button } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { CheckCircle, KeyIcon, GiftIcon } from "lucide-react";
import { useEnrollFromInventory } from "../../../../features/enrollment/enrollment.hooks";
import { InventoryItemVm } from "../../../../features/inventory/inventory.types";
import { cn } from "../../../../utils/cn";
import { Link, useNavigate } from "react-router";

type InventoryItemCardProps = {
  item: InventoryItemVm;
  onGift?: (id: string) => void;
};

const InventoryItemCard = ({ item, onGift }: InventoryItemCardProps) => {
  const navigate = useNavigate();
  const enrollFromInventoryMutation = useEnrollFromInventory();

  const handleConfirmEnroll = () => {
    if (item.enrolled || item.quantity <= 0) return;

    openConfirmModal({
      title: "Confirm Enrollment",
      centered: true,
      children: (
        <p>
          Do you want to enroll in{" "}
          <strong className="text-black dark:text-white">{item.courseTitle}</strong>?
        </p>
      ),
      labels: { confirm: "Yes, Enroll", cancel: "Cancel" },
      confirmProps: { color: "teal", loading: enrollFromInventoryMutation.isPending },
      onConfirm: () => enrollFromInventoryMutation.mutate({ inventoryItemId: item.id }),
    });
  };

  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4
        sm:p-5 flex flex-col sm:flex-row gap-4"
    >
      <div
        className="w-full sm:w-28 h-44 sm:h-28 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700
          shadow-sm flex-shrink-0"
      >
        <img
          src={item.courseImageUrl}
          alt={item.courseTitle}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Link
            to={`/courses/${item.courseId}`}
            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => navigate(`/courses/${item.courseId}`)}
          >
            {item.courseTitle}
          </Link>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium bg-gradient-to-br from-indigo-500 to-purple-500
              text-white shadow-sm w-fit"
          >
            Quantity: {item.quantity}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {item.courseSummary}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle
              className={`w-5 h-5 ${item.enrolled ? "text-green-500" : "text-gray-300"}`}
            />
            <span>{item.enrolled ? "Enrolled" : "Not Enrolled"}</span>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleConfirmEnroll}
              disabled={item.enrolled || item.quantity <= 0}
              color="teal"
              loading={enrollFromInventoryMutation.isPending}
              leftSection={<KeyIcon size={16} />}
            >
              Enroll
            </Button>
            <Button
              leftSection={<GiftIcon size={16} />}
              onClick={() => onGift?.(item.id)}
              disabled={item.quantity <= 0}
              className={cn({
                "bg-rose-500 dark:bg-rose-600": item.quantity > 0,
              })}
            >
              Gift
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemCard;
