import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/cn";

type SearchBoxProps = {
  autoFocus?: boolean;
  onSearch?: () => void;
} & Omit<TextInputProps, "rightSection" | "value" | "onChange" | "onKeyDown">;
// Omit để tránh xung đột những thứ bạn đã custom cứng

const SearchBox = ({ autoFocus = false, onSearch, className, ...rest }: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchValue.trim();
    if (!query) return;
    navigate(`/courses?search=${encodeURIComponent(query)}`);
    onSearch?.();
  };

  return (
    <TextInput
      autoFocus={autoFocus}
      type="search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
      rightSection={
        <div className="flex items-center justify-end gap-1 max-w-full pr-2">
          {searchValue && (
            <ActionIcon
              size={28}
              variant="subtle"
              color="gray"
              radius="3xl"
              onMouseDown={(e) => {
                e.preventDefault();
                setSearchValue("");
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
            <IconSearch size={18} stroke={1.5} />
          </ActionIcon>
        </div>
      }
      className={cn("flex-1 max-w-120 h-full", className)}
      {...rest}
    />
  );
};

export default SearchBox;
