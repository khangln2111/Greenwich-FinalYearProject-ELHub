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
import { AppSegmentedControl } from "../../../../../components/AppSegmentedControl";
import { CourseOrderableFields } from "../../../../../features/course/course.types";
import { OrderBy } from "../../../../../api-client/api.types";

export interface CourseSorterProps {
  value: OrderBy<CourseOrderableFields>;
  onChange: (val: OrderBy<CourseOrderableFields>) => void;
}

const COURSE_SORTING_OPTIONS: {
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

export const CourseSorter = ({ value, onChange }: CourseSorterProps) => {
  const [currentHoveredField, setCurrentHoveredField] = useState<CourseOrderableFields | null>(
    null,
  );

  const currentDisplayedField = useMemo(
    () => COURSE_SORTING_OPTIONS.find((opt) => opt.field === (currentHoveredField ?? value.field)),
    [currentHoveredField, value.field],
  );

  // Computed current displayed option (hovered or selected)
  const displayLabel = useMemo(() => {
    if (!currentDisplayedField) return "";
    const fieldLabel = currentDisplayedField.label;
    const directionLabel =
      currentDisplayedField.field === "createdAt"
        ? value.direction === "asc"
          ? "(Oldest)"
          : "(Newest)"
        : value.direction === "asc"
          ? "(Asc)"
          : "(Desc)";
    return `${fieldLabel} ${directionLabel}`;
  }, [currentDisplayedField, value.direction]);

  // Toggle direction only for current field
  const handleDirectionToggle = () => {
    onChange({ ...value, direction: value.direction === "asc" ? "desc" : "asc" });
  };

  // Handle field change when a new field is selected
  const handleFieldChange = (field: CourseOrderableFields) => {
    onChange({ ...value, field });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <Text fw={500} className="text-md dark:text-white">
          Sorting:
        </Text>
        <div className="flex items-center gap-2">
          <motion.p
            key={currentHoveredField ?? value.field}
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
            onClick={handleDirectionToggle}
          >
            {value.direction === "asc" ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
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
        value={value.field}
        onChange={(field) => handleFieldChange(field as CourseOrderableFields)}
        data={COURSE_SORTING_OPTIONS.map((option) => ({
          value: option.field,
          label: <div className="flex justify-center items-center">{option.icon}</div>,
          labelProps: {
            onMouseEnter: () => setCurrentHoveredField(option.field),
            onMouseLeave: () => setCurrentHoveredField(null),
          },
        }))}
      />
    </>
  );
};
