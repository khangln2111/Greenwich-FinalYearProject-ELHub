import { Button, SegmentedControl, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconClock,
  IconEye,
  IconSortAZ,
  IconStar,
  IconThumbUp,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortingOptions = [
  { value: "date", label: "DATE", icon: <IconClock size={18} /> },
  { value: "likes", label: "LIKES", icon: <IconThumbUp size={18} /> },
  { value: "views", label: "VIEWS", icon: <IconEye size={18} /> },
  { value: "alphabet", label: "A-Z", icon: <IconSortAZ size={18} /> },
  { value: "rating", label: "RATING", icon: <IconStar size={18} /> },
];

const Sorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Lấy giá trị sort từ URL hoặc dùng mặc định "date"
  const selectedSort = searchParams.get("orderBy") || "date";
  // Lấy giá trị asc từ URL và chuyển đổi sang boolean
  const isAsc = searchParams.get("acs") === "true" || false;

  const [hoveredSort, setHoveredSort] = useState<string | null>(null);

  const handleSortChange = (orderBy: string, asc: boolean) => {
    // Cập nhật searchParams mới
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", orderBy);
    params.set("acs", asc ? "true" : "false");

    setSearchParams(params, { preventScrollReset: true });
  };

  return (
    <>
      {/* Header + Reverse Sorting Button */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Text fw={500} size="sm">
            Sorting:
          </Text>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Text className="font-semibold text-sm" component="div">
            <motion.p
              key={hoveredSort || selectedSort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {hoveredSort
                ? sortingOptions.find((opt) => opt.value === hoveredSort)?.label
                : sortingOptions.find((opt) => opt.value === selectedSort)?.label}{" "}
              {selectedSort === "date" || hoveredSort === "date"
                ? isAsc
                  ? "(Oldest)"
                  : "(Newest)"
                : isAsc
                  ? "(Asc)"
                  : "(Desc)"}
            </motion.p>
          </Text>
          <Button
            variant="default"
            size="compact-xs"
            className="p-0 w-7 h-7 flex items-center justify-center"
            onClick={() => handleSortChange(selectedSort, !isAsc)}
          >
            {isAsc ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
          </Button>
        </div>
      </div>

      {/* Sorting Options */}
      <SegmentedControl
        radius="full"
        className="grid auto-cols-fr grid-flow-col-dense"
        color="blue"
        value={selectedSort}
        onChange={(value) => handleSortChange(value, isAsc)}
        data={sortingOptions.map((option) => ({
          value: option.value,
          label: (
            <div
              className="flex justify-center items-center"
              onMouseEnter={() => setHoveredSort(option.value)}
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

export default Sorting;
