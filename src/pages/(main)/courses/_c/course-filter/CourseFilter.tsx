import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Chip,
  Divider,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconFilterCog } from "@tabler/icons-react";
import { RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "../../../../../features/category/categoryHooks";
import { CourseLevel, CoursePriceMode } from "../../../../../features/course/course.types";
import { useCourseQueryState } from "../../../../../hooks/useCoursesQueryState";
import CourseSorter from "./CourseSorter";

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

const CourseFilter = () => {
  const [_, setSearchParams] = useSearchParams();

  const [
    {
      categoryId,
      levels,
      minDurationInSeconds,
      maxDurationInSeconds,
      priceModes,
      minPrice,
      maxPrice,
    },
    setCourseQuery,
  ] = useCourseQueryState();

  const {
    data: categories,
    isPending,
    isError,
  } = useGetCategories({
    pageSize: 100,
  });

  const handleResetFilters = () => setSearchParams(new URLSearchParams());

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

      {/* course sorter */}
      <Stack className="py-md px-sm lg:px-md xl:px-lg">
        <CourseSorter />
      </Stack>

      <Divider className="mt-lg" />

      {/* filters with accordion */}
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
        {/* Price range */}
        <AccordionItem value="Price range">
          <AccordionControl>
            <Text className="font-medium text-md">Price Range</Text>
          </AccordionControl>
          <AccordionPanel>
            <div className="px-1">
              <RangeSlider
                key={`price-range-${minPrice}-${maxPrice}`}
                min={0}
                max={500}
                step={1}
                disabled={priceModes.length === 1 && priceModes.includes(CoursePriceMode.Free)}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 100, label: "$100" },
                  { value: 200, label: "$200" },
                  { value: 300, label: "$300" },
                  { value: 400, label: "$400" },
                  { value: 500, label: "$500+" },
                ]}
                defaultValue={[minPrice ?? 0, maxPrice ?? 500]}
                onChangeEnd={(val) => {
                  const [min, max] = val;
                  setCourseQuery({ minPrice: min, maxPrice: max });
                }}
                className="my-xl"
              />
            </div>
          </AccordionPanel>
        </AccordionItem>
        {/* Duration */}
        <AccordionItem value="Duration">
          <AccordionControl>
            <Text className="font-medium text-md">Duration (minutes)</Text>
          </AccordionControl>
          <AccordionPanel>
            <div className="px-1">
              <RangeSlider
                key={`duration-range-${minDurationInSeconds}-${maxDurationInSeconds}`}
                min={0}
                max={16}
                marks={[
                  { value: 0, label: "0h" },
                  { value: 2, label: "2h" },
                  { value: 6, label: "6h" },
                  { value: 9, label: "7h" },
                  { value: 12, label: "14h" },
                  { value: 16, label: "16h+" },
                ]}
                defaultValue={[
                  (minDurationInSeconds ?? 0) / 3600,
                  (maxDurationInSeconds ?? 16 * 3600) / 3600,
                ]}
                restrictToMarks
                onChangeEnd={(val) => {
                  const [minHours, maxHours] = val;
                  setCourseQuery({
                    minDurationInSeconds: minHours > 0 ? minHours * 3600 : null,
                    maxDurationInSeconds: maxHours < 16 ? maxHours * 3600 : null,
                  });
                }}
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
              className="py-md"
              value={levels}
              onChange={(values) => setCourseQuery({ levels: values as CourseLevel[] })}
            >
              <Stack gap="md">
                {[...Object.values(CourseLevel)].map((lv) => (
                  <Checkbox key={lv} label={lv} value={lv} />
                ))}
              </Stack>
            </Checkbox.Group>
          </AccordionPanel>
        </AccordionItem>
        {/* Price mode */}
        <AccordionItem value="Price mode">
          <AccordionControl>
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
                    // Nếu chỉ Free hoặc có Free thì bỏ filter price
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
                multiple={true}
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

export default CourseFilter;
