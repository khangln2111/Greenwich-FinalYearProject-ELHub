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
  Title,
  Tooltip,
} from "@mantine/core";
import { IconFilterCog } from "@tabler/icons-react";
import { DollarSignIcon, RotateCcw } from "lucide-react";
import { encodeOrderOption } from "../../../../../api-client/api.types";
import { useGetCategories } from "../../../../../features/category/categoryHooks";
import { CourseLevel, CoursePriceMode } from "../../../../../features/course/course.types";
import { useCourseQueryState } from "../../../../../hooks/useCoursesQueryState";
import { CourseSorter } from "./CourseSorter";
import { useState } from "react";

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

const CourseDesktopFilter = () => {
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

  const { data: categories, isPending, isError } = useGetCategories({ pageSize: 100 });

  const [minPriceInput, setMinPriceInput] = useState<number | string | undefined>(
    minPrice ?? undefined,
  );
  const [maxPriceInput, setMaxPriceInput] = useState<number | string | undefined>(
    maxPrice ?? undefined,
  );

  const handleResetFilters = () => {
    resetCourseQuery();
    setMinPriceInput(undefined);
    setMaxPriceInput(undefined);
  };

  return (
    <>
      {/* Header */}
      <div className="pt-lg flex justify-between px-sm lg:px-md xl:px-lg">
        <div className="flex gap-3 items-center">
          <IconFilterCog />
          <Title order={3} fw={700} className="dark:text-white">
            Filters
          </Title>
        </div>
        <div className="flex gap-1 cursor-pointer items-center group" onClick={handleResetFilters}>
          <p className="font-semibold text-primary-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Reset
          </p>
          <div className="size-8 flex items-center justify-center border border-gray-300 rounded dark:border-dark-4">
            <RotateCcw className="text-primary-6" size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <Divider className="my-lg" />

      {/* Sorter */}
      <Stack className="py-md px-sm lg:px-md xl:px-lg">
        <CourseSorter
          value={orderBy}
          onChange={(val) =>
            setCourseQuery({
              orderBy: encodeOrderOption(val),
            })
          }
        />
      </Stack>

      <Divider className="mt-lg" />

      {/* Accordion filters */}
      <Accordion
        multiple
        radius={0}
        classNames={{
          item: "border-0",
          control: "px-sm lg:px-md xl:px-lg",
        }}
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
              value={categoryId}
              placeholder={
                isPending ? "Loading categories..." : isError ? "Failed to load" : "Select category"
              }
              data={categories?.items.map((cat) => ({ value: cat.id, label: cat.name })) || []}
              disabled={isPending || isError}
              searchable
              clearable
              checkIconPosition="right"
              onChange={(val) => setCourseQuery({ categoryId: val })}
              size="md"
              comboboxProps={{ shadow: "xl", transitionProps: { transition: "pop-top-left" } }}
              nothingFoundMessage="Nothing found..."
              classNames={{
                root: "my-md",
                option: "font-normal hover:bg-primary-6 hover:text-white",
                dropdown: `bg-[#f0f0f0] dark:bg-dark-6 border border-[#ccc] dark:border-dark-4
                shadow-[0_4px_6px_rbga(0,0,0,0.1)] `,
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
                  hideControls
                  value={minPriceInput}
                  onChange={(val) => setMinPriceInput(val)}
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
                  hideControls
                  value={maxPriceInput}
                  onChange={(val) => setMaxPriceInput(val)}
                  disabled={priceModes.length === 1 && priceModes.includes(CoursePriceMode.Free)}
                />
              </div>

              {/* Apply Button */}
              <Button
                size="sm"
                onClick={() => {
                  setCourseQuery({
                    minPrice: Number(minPriceInput),
                    maxPrice: Number(maxPriceInput),
                  });
                }}
                fullWidth
                variant="outline"
                disabled={priceModes.length === 1 && priceModes.includes(CoursePriceMode.Free)}
              >
                Apply
              </Button>

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
                key={`duration-${minDurationInSeconds}-${maxDurationInSeconds}`}
                min={0}
                max={16}
                restrictToMarks
                marks={[
                  { value: 0, label: "0h" },
                  { value: 2, label: "2h" },
                  { value: 6, label: "6h" },
                  { value: 9, label: "9h" },
                  { value: 12, label: "12h" },
                  { value: 16, label: "16h+" },
                ]}
                defaultValue={[
                  (minDurationInSeconds ?? 0) / 3600,
                  (maxDurationInSeconds ?? 16 * 3600) / 3600,
                ]}
                onChangeEnd={([minH, maxH]) =>
                  setCourseQuery({
                    minDurationInSeconds: minH > 0 ? minH * 3600 : null,
                    maxDurationInSeconds: maxH < 16 ? maxH * 3600 : null,
                  })
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
              value={levels}
              onChange={(values) => setCourseQuery({ levels: values as CourseLevel[] })}
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
          <AccordionControl className="not-data-active:hover:rounded-b-2xl">
            <Text className="font-medium text-md">Price mode</Text>
          </AccordionControl>
          <AccordionPanel>
            <div className="flex gap-2 my-sm items-center">
              <Chip.Group
                value={priceModes}
                onChange={(values) => {
                  const newPriceModes = values as CoursePriceMode[];
                  setCourseQuery({
                    priceModes: newPriceModes,
                    // If only Free or has Free then remove price filter
                    minPrice:
                      newPriceModes.includes(CoursePriceMode.Free) &&
                      !newPriceModes.includes(CoursePriceMode.Paid)
                        ? null
                        : minPrice,
                    maxPrice:
                      newPriceModes.includes(CoursePriceMode.Free) &&
                      !newPriceModes.includes(CoursePriceMode.Paid)
                        ? null
                        : maxPrice,
                  });
                }}
                multiple
              >
                <Tooltip label="Getting all free course" refProp="rootRef">
                  <Chip key={CoursePriceMode.Free} variant="outline" value={CoursePriceMode.Free}>
                    Free
                  </Chip>
                </Tooltip>
                <Tooltip label="Getting all paid course" refProp="rootRef">
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
  );
};

export default CourseDesktopFilter;
