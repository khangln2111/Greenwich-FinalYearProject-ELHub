import { Button, SegmentedControl, Text } from "@mantine/core";
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
import { useState } from "react";
import { useSearchParamState } from "../../../../hooks/useSearchParamState";
import {
  decodeOrderOption,
  encodeOrderOption,
  OrderBy,
  OrderDirection,
} from "../../../../http-client/api.types";
import { CourseOrderableFields } from "../../../../react-query/course/course.types";

const SORTING_OPTIONS: {
  value: OrderBy<CourseOrderableFields>;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: { field: "createdAt", direction: "desc" },
    label: "DATE",
    icon: <IconClock size={18} />,
  },
  {
    value: { field: "discountedPrice", direction: "asc" },
    label: "PRICE",
    icon: <IconCoin size={18} />,
  },
  {
    value: { field: "enrollmentCount", direction: "desc" },
    label: "POPULAR",
    icon: <IconUserPlus size={18} />,
  },
  {
    value: { field: "title", direction: "asc" },
    label: "A-Z",
    icon: <IconSortAZ size={18} />,
  },
  {
    value: { field: "averageRating", direction: "desc" },
    label: "RATING",
    icon: <IconStar size={18} />,
  },
];

const CourseSorter = () => {
  const [orderByParam, setOrderByParam] = useSearchParamState<string>(
    "orderBy",
    encodeOrderOption({ field: "createdAt", direction: "desc" }),
  );

  const orderBy = decodeOrderOption<CourseOrderableFields>(orderByParam, "createdAt", "desc");

  const [hoveredSort, setHoveredSort] = useState<CourseOrderableFields | null>(null);

  const handleFieldChange = (field: string) => {
    const found = SORTING_OPTIONS.find((opt) => opt.value.field === field);
    if (!found) return;
    setOrderByParam(
      encodeOrderOption({ field: field as CourseOrderableFields, direction: orderBy.direction }),
    );
  };

  const toggleSortDirection = () => {
    const newDirection: OrderDirection = orderBy.direction === "asc" ? "desc" : "asc";
    const updated = { ...orderBy, direction: newDirection };
    setOrderByParam(encodeOrderOption(updated));
  };

  return (
    <>
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
            {
              SORTING_OPTIONS.find((opt) => opt.value.field === (hoveredSort ?? orderBy.field))
                ?.label
            }{" "}
            {orderBy.field === "createdAt"
              ? orderBy.direction === "asc"
                ? "(Oldest)"
                : "(Newest)"
              : orderBy.direction === "asc"
                ? "(Asc)"
                : "(Desc)"}
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

      <SegmentedControl
        radius="full"
        className="grid auto-cols-fr grid-flow-col-dense"
        color="blue"
        value={orderBy.field}
        onChange={handleFieldChange}
        data={SORTING_OPTIONS.map((option) => ({
          value: option.value.field,
          label: (
            <div
              className="flex justify-center items-center"
              onMouseEnter={() => setHoveredSort(option.value.field)}
              onMouseLeave={() => setHoveredSort(null)}
            >
              {option.icon}
            </div>
          ),
        }))}
      />
    </>
  );
};

export default CourseSorter;
