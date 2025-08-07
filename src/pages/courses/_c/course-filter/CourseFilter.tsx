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
import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "../../../../features/category/categoryHooks";
import CourseSorter from "./CourseSorter";
import { useSearchParamState } from "../../../../hooks/useSearchParamState";

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

const CourseFilter = () => {
  const [_, setSearchParams] = useSearchParams();

  const [categoryId, setCategoryId] = useSearchParamState("categoryId");
  const [priceRange, setPriceRange] = useSearchParamState("price_range");
  const [duration, setDuration] = useSearchParamState("duration");
  const [level, setLevel] = useSearchParamState("level");
  const [priceMode, setPriceMode] = useSearchParamState("price_mode");

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
        classNames={{ item: "border-x-0" }}
        defaultValue={defaultOpenedItems}
        transitionDuration={400}
      >
        {/* Category */}
        <AccordionItem value="Category">
          <AccordionControl>
            <Text className="font-medium text-sm">Category</Text>
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
              onChange={(val) => setCategoryId(val)}
              comboboxProps={{ shadow: "xl", transitionProps: { transition: "pop-top-left" } }}
              classNames={{
                root: "my-md",
                option: "font-normal hover:bg-primary-6 hover:text-white",
                dropdown:
                  "bg-[#f0f0f0] border border-[#ccc] shadow-[0_4px_6px_rbga(0,0,0,0.1)] dark:bg-dark-6",
                input: "border-2",
              }}
            />
          </AccordionPanel>
        </AccordionItem>

        {/* Price range */}
        <AccordionItem value="Price range">
          <AccordionControl>
            <Text className="font-medium text-sm">Price Range</Text>
          </AccordionControl>
          <AccordionPanel>
            <Slider
              min={0}
              max={100}
              step={1}
              marks={[
                { value: 0, label: "$0" },
                { value: 100, label: "$100" },
              ]}
              defaultValue={parseInt(priceRange || "0", 10)}
              onChangeEnd={(val) => setPriceRange(val.toString())}
              className="my-xl"
            />
          </AccordionPanel>
        </AccordionItem>

        {/* Duration */}
        <AccordionItem value="Duration">
          <AccordionControl>
            <Text className="font-medium text-sm">Duration (minutes)</Text>
          </AccordionControl>
          <AccordionPanel>
            <Slider
              min={0}
              max={120}
              step={1}
              marks={[
                { value: 0, label: "0" },
                { value: 120, label: "120" },
              ]}
              defaultValue={parseInt(duration || "0", 10)}
              onChangeEnd={(val) => setDuration(val.toString())}
              className="my-[30px]"
            />
          </AccordionPanel>
        </AccordionItem>

        {/* Level */}
        <AccordionItem value="Level">
          <AccordionControl>
            <Text className="font-medium text-sm">Level</Text>
          </AccordionControl>
          <AccordionPanel>
            <Stack gap="xs">
              {["beginner", "intermediate", "advanced", "all"].map((lv) => (
                <Checkbox
                  key={lv}
                  label={lv === "all" ? "All levels" : lv.charAt(0).toUpperCase() + lv.slice(1)}
                  checked={lv === "all" ? !level : level === lv}
                  onChange={() => setLevel(lv === "all" ? "" : lv)}
                />
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>

        {/* Price mode */}
        <AccordionItem value="Price mode">
          <AccordionControl>
            <Text className="font-medium text-sm">Price mode</Text>
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
