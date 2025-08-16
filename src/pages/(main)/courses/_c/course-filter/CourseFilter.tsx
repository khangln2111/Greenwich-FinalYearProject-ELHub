import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Chip,
  Divider,
  Select,
  Slider,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconFilterCog } from "@tabler/icons-react";
import { RotateCcw } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "../../../../../features/category/categoryHooks";
import { useCourseQueryState } from "../../../../../hooks/useCoursesQueryState";
import CourseSorter from "./CourseSorter";
import { CourseLevel } from "../../../../../features/course/course.types";

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

const CourseFilter = () => {
  const [_, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useQueryState("price_range", parseAsInteger);
  const [duration, setDuration] = useQueryState("duration", parseAsInteger);
  const [priceMode, setPriceMode] = useQueryState("price_mode");

  const [{ categoryId, levels }, setCourseQuery] = useCourseQueryState();
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
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <IconFilterCog />
          <Title order={3} fw={700}>
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

      <Divider className="my-lg -mx-lg" />

      <Stack className="py-md">
        <CourseSorter />
      </Stack>

      <Divider className="mt-lg -mx-lg" />

      <Accordion
        mx="-lg"
        multiple
        radius={0}
        classNames={{ item: "border-0" }}
        className="divide-y!"
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
            <div className="px-1 md:px-0">
              <Slider
                min={0}
                max={100}
                step={1}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 100, label: "$100" },
                ]}
                defaultValue={priceRange || 0}
                onChangeEnd={(val) => setPriceRange(val)}
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
            <div className="px-1 md:px-0">
              <Slider
                min={0}
                max={120}
                step={1}
                marks={[
                  { value: 0, label: "0" },
                  { value: 120, label: "120" },
                ]}
                defaultValue={duration || 0}
                onChangeEnd={(val) => setDuration(val)}
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
              <Tooltip label="Getting all free course" refProp="rootRef">
                <Chip
                  variant="outline"
                  checked={priceMode === "free"}
                  onClick={() => setPriceMode(priceMode === "free" ? "" : "free")}
                >
                  Free
                </Chip>
              </Tooltip>
              <Tooltip label="Getting all paid course" refProp="rootRef">
                <Chip
                  variant="outline"
                  checked={priceMode === "paid"}
                  onClick={() => setPriceMode(priceMode === "paid" ? "" : "paid")}
                >
                  Paid
                </Chip>
              </Tooltip>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default CourseFilter;
