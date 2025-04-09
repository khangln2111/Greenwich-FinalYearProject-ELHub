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
import { useGetCategories } from "../../../react-query/category/categoryHooks";
import Sorting from "./Sorting";

const defaultOpenedItems = ["Price range", "Duration", "Category", "Level", "Price mode"];

type FilterProps = {};

const Filter = ({}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories, isPending, isError } = useGetCategories(); // Lấy danh sách category từ API

  // Hàm để thay đổi search params
  const handleFilterChange = (param: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(param, value);
    } else {
      newParams.delete(param);
    }
    setSearchParams(newParams); // Thay đổi URL mà không cần navigate
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <IconFilterCog />
          <Title order={3} fw={700}>
            Filters
          </Title>
        </div>
        <div className="flex gap-1 cursor-pointer items-center group">
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
        <Sorting />
      </Stack>
      <Divider className="mt-lg -mx-lg" />
      <Accordion
        mx="-lg"
        multiple
        radius={0}
        classNames={{
          item: "border-x-0",
        }}
        defaultValue={defaultOpenedItems}
        transitionDuration={400}
      >
        {/* Category filter */}
        <AccordionItem value="Category">
          <AccordionControl>
            <Text className="font-medium text-sm">Category</Text>
          </AccordionControl>
          <AccordionPanel>
            <Select
              placeholder={
                isPending ? "Loading categories..." : isError ? "Failed to load" : "Select category"
              }
              data={categories?.items.map((category) => {
                return { value: category.id, label: category.name };
              })}
              disabled={isPending || isError}
              searchable
              checkIconPosition="right"
              comboboxProps={{ shadow: "xl", transitionProps: { transition: "pop-top-left" } }}
              classNames={{
                root: "my-md",
                option: "font-normal hover:bg-primary-6 hover:text-white",
                dropdown:
                  "bg-[#f0f0f0] border border-[#ccc] shadow-[0_4px_6px_rbga(0,0,0,0.1)] dark:bg-dark-6",
                input: "border-2",
              }}
              onChange={(value) => handleFilterChange("category", value as string)}
            />
          </AccordionPanel>
        </AccordionItem>
        {/* Price range filter */}
        <AccordionItem value="Price range">
          <AccordionControl>
            <Text className="font-medium text-sm">Price Range:</Text>
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
              className="my-xl"
              onChangeEnd={(value) => handleFilterChange("price_range", value.toString())}
            />
          </AccordionPanel>
        </AccordionItem>
        {/* Duration filter */}
        <AccordionItem value="Duration">
          <AccordionControl>
            <Text className="font-medium text-sm">Duration (minutes):</Text>
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
              className="my-[30px]"
              onChangeEnd={(value) => handleFilterChange("duration", value.toString())}
            />
          </AccordionPanel>
        </AccordionItem>
        {/* Level filtering */}
        <AccordionItem value="Level">
          <AccordionControl>
            <Text className="font-medium text-sm">Level</Text>
          </AccordionControl>
          <AccordionPanel>
            <div className="flex flex-col gap-md">
              <Checkbox label="Beginner" onChange={() => handleFilterChange("level", "beginner")} />
              <Checkbox
                label="Intermediate"
                onChange={() => handleFilterChange("level", "intermediate")}
              />
              <Checkbox label="Advanced" onChange={() => handleFilterChange("level", "advanced")} />
              <Checkbox label="All levels" onChange={() => handleFilterChange("level", "")} />
            </div>
          </AccordionPanel>
        </AccordionItem>
        {/* Price mode filtering */}
        <AccordionItem value="Price mode">
          <AccordionControl>
            <Text className="font-medium text-sm">Price mode</Text>
          </AccordionControl>
          <AccordionPanel>
            <div className="flex gap-2 my-sm items-center">
              <Tooltip label="Getting all free course" refProp="rootRef">
                <Chip defaultChecked variant="outline">
                  Free
                </Chip>
              </Tooltip>
              <Tooltip label="Getting all paid course" refProp="rootRef">
                <Chip defaultChecked variant="outline">
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

export default Filter;
