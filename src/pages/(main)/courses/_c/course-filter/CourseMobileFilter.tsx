import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Chip,
  Divider,
  NumberInput,
  RangeSlider,
  Select,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DollarSignIcon } from "lucide-react";
import { ResponsiveDialog } from "mantine-vaul";
import { useEffect, useState, useTransition } from "react";
import { encodeOrderOption } from "../../../../../api-client/api.types";
import { useGetCategories } from "../../../../../features/category/categoryHooks";
import { CourseLevel, CoursePriceMode } from "../../../../../features/course/course.types";
import { useCourseQueryState } from "../../../../../hooks/useCoursesQueryState";
import { useCoursesPageStore } from "../../../../../zustand/stores/coursesPageStore";
import { CourseSorter } from "./CourseSorter";

type CourseMobileFilterProps = {};

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

const CourseMobileFilter = ({}: CourseMobileFilterProps) => {
  const [_, startTransition] = useTransition();
  const isMobileFilterOpen = useCoursesPageStore((s) => s.isMobileFilterOpen);
  const closeMobileFilter = useCoursesPageStore((s) => s.closeMobileFilter);
  const { data: categories, isPending, isError } = useGetCategories({ pageSize: 100 });
  const [
    {
      categoryId,
      levels,
      minDurationInSeconds,
      maxDurationInSeconds,
      priceModes,
      minPrice,
      maxPrice,
      orderBy,
    },
    setCourseQuery,
    resetCourseQuery,
  ] = useCourseQueryState();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [tempFilters, setTempFilters] = useState({
    categoryId,
    levels,
    minDurationInSeconds,
    maxDurationInSeconds,
    priceModes,
    minPrice,
    maxPrice,
  });

  const [tempSorter, setTempSorter] = useState({
    field: orderBy.field,
    direction: orderBy.direction,
  });

  const handleReset = () => {
    startTransition(() => {
      resetCourseQuery();
    });
    closeMobileFilter();
  };

  const handleApply = () => {
    startTransition(() => {
      setCourseQuery({
        ...tempFilters,
        orderBy: encodeOrderOption(tempSorter),
      });
    });
    closeMobileFilter();
  };

  useEffect(() => {
    setTempFilters({
      categoryId,
      levels,
      minDurationInSeconds,
      maxDurationInSeconds,
      priceModes,
      minPrice,
      maxPrice,
    });
    setTempSorter({
      field: orderBy.field,
      direction: orderBy.direction,
    });
  }, [isMobileFilterOpen]);

  if (isDesktop) return null;

  return (
    <ResponsiveDialog
      opened={isMobileFilterOpen}
      onClose={closeMobileFilter}
      radius="xl"
      shadow="xl"
      title={<p className="text-h4 font-h4">Advanced filter</p>}
      footer={
        <div className="flex gap-3">
          <Button fullWidth radius="full" variant="light" onClick={handleReset}>
            Reset
          </Button>
          <Button fullWidth radius="full" onClick={handleApply}>
            Apply
          </Button>
        </div>
      }
      vaulProps={{
        trapFocus: true,
        classNames: {
          footer: "border-t-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1)]",
          header: "border-b border-gray-200 dark:border-gray-800",
        },
      }}
      matches={{
        base: "vaul",
        md: "drawer",
      }}
    >
      <>
        <Stack className="py-md px-sm lg:px-md xl:px-lg">
          <CourseSorter value={tempSorter} onChange={setTempSorter} />
        </Stack>

        <Divider className="mt-lg" />

        {/* Accordion filters */}
        <Accordion
          multiple
          radius={0}
          classNames={{ item: "border-0", control: "px-sm lg:px-md xl:px-lg" }}
          className="divide-y! mt-0.5"
          defaultValue={defaultOpenedItems}
          transitionDuration={400}
        >
          {/* Category */}
          <AccordionItem value="Category">
            <AccordionControl>
              <Text className="font-medium text-md">Category</Text>
            </AccordionControl>
            <AccordionPanel>
              <Select
                value={tempFilters.categoryId}
                placeholder={
                  isPending
                    ? "Loading categories..."
                    : isError
                      ? "Failed to load"
                      : "Select category"
                }
                data={categories?.items.map((cat) => ({ value: cat.id, label: cat.name })) || []}
                disabled={isPending || isError}
                searchable
                clearable
                checkIconPosition="right"
                onChange={(val) => setTempFilters((prev) => ({ ...prev, categoryId: val }))}
                comboboxProps={{
                  shadow: "xl",
                  withinPortal: false,
                  transitionProps: { transition: "pop-top-left" },
                }}
                nothingFoundMessage="Nothing found..."
                classNames={{
                  root: "my-md",
                  option: "font-normal hover:bg-primary-6 hover:text-white",
                  dropdown: `bg-[#f0f0f0] dark:bg-dark-6 border border-[#ccc] dark:border-dark-4
                  shadow-[0_4px_6px_rbga(0,0,0,0.1)] z-9999`,
                  input: "border-2",
                }}
              />
            </AccordionPanel>
          </AccordionItem>
          {/* Price Range */}
          <AccordionItem value="Price range">
            <AccordionControl>
              <Text className="font-medium text-md">Price Range</Text>
            </AccordionControl>
            <AccordionPanel>
              <div className="flex flex-col items-center justify-center gap-6 py-sm">
                <div className="flex items-center justify-between gap-2">
                  {/* Min Price */}
                  <NumberInput
                    key={`min-price-${minPrice}`}
                    placeholder="Min"
                    min={0}
                    clampBehavior="strict"
                    leftSection={<DollarSignIcon size={16} />}
                    thousandSeparator=","
                    hideControls
                    value={tempFilters.minPrice ?? undefined}
                    onChange={(val) =>
                      setTempFilters((prev) => ({ ...prev, minPrice: Number(val) }))
                    }
                    disabled={priceModes.length === 1 && priceModes.includes(CoursePriceMode.Free)}
                  />
                  <span>-</span>
                  {/* Max Price */}
                  <NumberInput
                    key={`max-price-${maxPrice}`}
                    placeholder="Max"
                    min={0}
                    clampBehavior="strict"
                    leftSection={<DollarSignIcon size={16} />}
                    thousandSeparator=","
                    hideControls
                    value={tempFilters.maxPrice ?? undefined}
                    onChange={(val) =>
                      setTempFilters((prev) => ({ ...prev, maxPrice: Number(val) }))
                    }
                    disabled={priceModes.length === 1 && priceModes.includes(CoursePriceMode.Free)}
                  />
                </div>

                {priceModes.includes(CoursePriceMode.Free) &&
                  !priceModes.includes(CoursePriceMode.Paid) && (
                    <Text size="sm" c="dimmed" className="text-center">
                      Price filter is disabled for free courses.
                    </Text>
                  )}
              </div>
            </AccordionPanel>
          </AccordionItem>
          {/* Duration */}
          <AccordionItem value="Duration">
            <AccordionControl>
              <Text className="font-medium text-md">Duration (hours)</Text>
            </AccordionControl>
            <AccordionPanel>
              <div className="px-1">
                <RangeSlider
                  key={`duration-${tempFilters.minDurationInSeconds}-${tempFilters.maxDurationInSeconds}`}
                  min={0}
                  max={16}
                  marks={[
                    { value: 0, label: "0h" },
                    { value: 2, label: "2h" },
                    { value: 6, label: "6h" },
                    { value: 9, label: "9h" },
                    { value: 12, label: "12h" },
                    { value: 16, label: "16h+" },
                  ]}
                  defaultValue={[
                    (tempFilters.minDurationInSeconds ?? 0) / 3600,
                    (tempFilters.maxDurationInSeconds ?? 16 * 3600) / 3600,
                  ]}
                  restrictToMarks
                  onChangeEnd={([minH, maxH]) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      minDurationInSeconds: minH > 0 ? minH * 3600 : null,
                      maxDurationInSeconds: maxH < 16 ? maxH * 3600 : null,
                    }))
                  }
                  className="my-[30px]"
                />
              </div>
            </AccordionPanel>
          </AccordionItem>
          {/* Level */}
          <AccordionItem value="Level">
            <AccordionControl>
              <Text className="font-medium text-md">Level</Text>
            </AccordionControl>
            <AccordionPanel>
              <Checkbox.Group
                value={tempFilters.levels}
                onChange={(values) =>
                  setTempFilters((prev) => ({ ...prev, levels: values as CourseLevel[] }))
                }
                className="py-md"
              >
                <Stack gap="md">
                  {[...Object.values(CourseLevel)].map((lv) => (
                    <Checkbox key={lv} label={lv} value={lv} />
                  ))}
                </Stack>
              </Checkbox.Group>
            </AccordionPanel>
          </AccordionItem>
          {/* Price Mode */}
          <AccordionItem value="Price mode">
            <AccordionControl>
              <Text className="font-medium text-md">Price mode</Text>
            </AccordionControl>
            <AccordionPanel>
              <div className="flex gap-2 my-sm items-center">
                <Chip.Group
                  value={tempFilters.priceModes}
                  onChange={(values) => {
                    const newPriceModes = values as CoursePriceMode[];
                    setTempFilters((prev) => ({
                      ...prev,
                      priceModes: newPriceModes,
                      minPrice:
                        newPriceModes.includes(CoursePriceMode.Free) &&
                        !newPriceModes.includes(CoursePriceMode.Paid)
                          ? null
                          : prev.minPrice,
                      maxPrice:
                        newPriceModes.includes(CoursePriceMode.Free) &&
                        !newPriceModes.includes(CoursePriceMode.Paid)
                          ? null
                          : prev.maxPrice,
                    }));
                  }}
                  multiple
                >
                  <Tooltip label="Getting all free course" refProp="rootRef" withinPortal={false}>
                    <Chip key={CoursePriceMode.Free} variant="outline" value={CoursePriceMode.Free}>
                      Free
                    </Chip>
                  </Tooltip>
                  <Tooltip label="Getting all paid course" refProp="rootRef" withinPortal={false}>
                    <Chip key={CoursePriceMode.Paid} variant="outline" value={CoursePriceMode.Paid}>
                      Paid
                    </Chip>
                  </Tooltip>
                </Chip.Group>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    </ResponsiveDialog>
  );
};

export default CourseMobileFilter;
