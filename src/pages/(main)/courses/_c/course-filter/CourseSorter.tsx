import { Button, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconClock,
  IconCoin,
  IconSortAZ,
  IconStar,
  IconUserPlus,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { encodeOrderOption, OrderDirection } from "../../../../../api-client/api.types";
import { AppSegmentedControl } from "../../../../../components/AppSegmentedControl";
import { CourseOrderableFields } from "../../../../../features/course/course.types";
import { useCourseQueryState } from "../../../../../hooks/useCoursesQueryState";

// SORTING_OPTIONS chỉ giữ field, label và icon
const SORTING_OPTIONS: {
  field: CourseOrderableFields;
  label: string;
  icon: React.ReactNode;
}[] = [
  { field: "createdAt", label: "DATE", icon: <IconClock size={18} /> },
  { field: "discountedPrice", label: "PRICE", icon: <IconCoin size={18} /> },
  { field: "enrollmentCount", label: "POPULAR", icon: <IconUserPlus size={18} /> },
  { field: "title", label: "A-Z", icon: <IconSortAZ size={18} /> },
  { field: "averageRating", label: "RATING", icon: <IconStar size={18} /> },
];

const CourseSorter = () => {
  const [{ orderBy }, setCourseQuery] = useCourseQueryState();
  const [hoveredSort, setHoveredSort] = useState<CourseOrderableFields | null>(null);

  // Current option (hovered or selected)
  const currentOption = useMemo(
    () => SORTING_OPTIONS.find((opt) => opt.field === (hoveredSort ?? orderBy.field)),
    [hoveredSort, orderBy.field],
  );

  // Display label with direction
  const displayLabel = useMemo(() => {
    if (!currentOption) return "";
    const fieldLabel = currentOption.label;
    const directionLabel =
      currentOption.field === "createdAt"
        ? orderBy.direction === "asc"
          ? "(Oldest)"
          : "(Newest)"
        : orderBy.direction === "asc"
          ? "(Asc)"
          : "(Desc)";
    return `${fieldLabel} ${directionLabel}`;
  }, [currentOption, orderBy.direction]);

  // Change sorting field (keep current direction)
  const handleFieldChange = (field: string) => {
    setCourseQuery({
      orderBy: encodeOrderOption({
        field: field as CourseOrderableFields,
        direction: orderBy.direction,
      }),
    });
  };

  // Toggle direction for current field
  const toggleSortDirection = () => {
    const newDirection: OrderDirection = orderBy.direction === "asc" ? "desc" : "asc";
    setCourseQuery({
      orderBy: encodeOrderOption({ field: orderBy.field, direction: newDirection }),
    });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <Text fw={500} size="sm">
          Sorting:
        </Text>

        <div className="flex items-center gap-2">
          <motion.p
            key={hoveredSort ?? orderBy.field}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold"
          >
            {displayLabel}
          </motion.p>

          <Button
            variant="default"
            size="compact-xs"
            className="p-0 w-7 h-7 flex items-center justify-center"
            onClick={toggleSortDirection}
          >
            {orderBy.direction === "asc" ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
          </Button>
        </div>
      </div>

      {/* SegmentedControl */}
      <AppSegmentedControl
        radius="full"
        className="grid auto-cols-fr grid-flow-col-dense"
        color="blue"
        size="lg"
        classNames={{
          label: "not-data-active:hover:bg-gray-4 not-data-active:dark:hover:bg-dark-5",
        }}
        value={orderBy.field}
        onChange={handleFieldChange}
        data={SORTING_OPTIONS.map((option) => ({
          value: option.field,
          label: <div className="flex justify-center items-center">{option.icon}</div>,
          labelProps: {
            onMouseEnter: () => setHoveredSort(option.field),
            onMouseLeave: () => setHoveredSort(null),
          },
        }))}
      />
    </>
  );
};

export default CourseSorter;
