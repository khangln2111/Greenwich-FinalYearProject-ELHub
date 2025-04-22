import { TextInputProps, TextInput, ActionIcon } from "@mantine/core";
import { IconX, IconSearch } from "@tabler/icons-react";
import { cn } from "../../../utils/cn";
import { ArrowRightIcon } from "lucide-react";

type SearchBoxProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
} & Omit<TextInputProps, "rightSection" | "value" | "onChange" | "onKeyDown">;

const SearchBox = ({
  autoFocus = false,
  onSearch,
  onClear,
  value,
  onChange,
  className,
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
              size={28}
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
            size={32}
            radius="3xl"
            color="primary"
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
