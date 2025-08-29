import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

type SearchBoxProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  leftIconSize?: number;
  rightIconSize?: number;
} & Omit<TextInputProps, "rightSection" | "value" | "onChange" | "onKeyDown">;

const SearchBox = ({
  autoFocus = false,
  onSearch,
  onClear,
  value,
  onChange,
  className,
  leftIconSize = 28,
  rightIconSize = 32,
  ...rest
}: SearchBoxProps) => {
  const handleSearch = () => {
    const query = value.trim();
    if (!query) return;
    onSearch?.();
  };

  return (
    <TextInput
      autoFocus={autoFocus}
      type="search"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
      leftSection={<IconSearch size={20} strokeWidth={1.5} />}
      rightSection={
        <div className="flex items-center justify-end gap-1 max-w-full pr-2">
          {value && (
            <ActionIcon
              size={leftIconSize}
              variant="subtle"
              color="gray"
              radius="3xl"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                onChange("");
                onClear?.();
              }}
              aria-label="Clear search"
            >
              <IconX size={18} />
            </ActionIcon>
          )}
          <ActionIcon
            size={rightIconSize}
            radius="3xl"
            variant="filled"
            onClick={handleSearch}
            aria-label="Search"
          >
            <ArrowRightIcon size={18} strokeWidth={1.5} />
          </ActionIcon>
        </div>
      }
      className={cn("flex-1 max-w-120 h-full", className)}
      {...rest}
    />
  );
};

export default SearchBox;
