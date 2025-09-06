import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  MantineSize,
  Pill,
  PillsInput,
  PillsInputProps,
  useCombobox,
} from "@mantine/core";
import { cn } from "../../utils/cn";

export interface MultiSelectWithMaxDisplayedItemsProps {
  value: string[];
  onChange: (value: string[]) => void;
  data: { label: string; value: string }[];
  placeholder?: string;
  hidePickedItems?: boolean;
  size?: MantineSize;
  classNames?: {
    wrapper?: string;
  };
  showMoreAfter?: number;
  inputProps?: Omit<PillsInputProps, "children" | "size" | "onClick" | "className">;
}

export function MultiSelectWithMaxDisplayedItems({
  value,
  onChange,
  data,
  placeholder = "Pick one or more values",
  hidePickedItems = false,
  size = "sm",
  classNames,
  showMoreAfter = 2,
  inputProps,
}: MultiSelectWithMaxDisplayedItemsProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const handleValueSelect = (val: string) =>
    onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);

  const handleValueRemove = (val: string) => onChange(value.filter((v) => v !== val));

  const displayedValues = value.slice(0, showMoreAfter - 1).map((item) => (
    <Pill key={item} size={size} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {data.find((d) => d.value === item)?.label ?? item}
    </Pill>
  ));

  const options = data
    .filter((item) => !hidePickedItems || !value.includes(item.value))
    .map((item) => (
      <Combobox.Option value={item.value} key={item.value} active={value.includes(item.value)}>
        <Group gap="sm">
          {value.includes(item.value) ? <CheckIcon size={12} /> : null}
          <span>{item.label}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div className={cn("flex-1 w-full", classNames?.wrapper)}>
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
        size={size}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            pointer
            onClick={() => combobox.toggleDropdown()}
            size={size}
            className="h-full"
            {...inputProps}
          >
            <Pill.Group size={size}>
              {value.length > 0 ? (
                <>
                  {displayedValues}
                  {value.length > showMoreAfter - 1 && (
                    <Pill size={size}>+{value.length - (showMoreAfter - 1)} more</Pill>
                  )}
                </>
              ) : (
                <div>
                  <Input.Placeholder>{placeholder}</Input.Placeholder>
                </div>
              )}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  type="hidden"
                  onBlur={() => combobox.closeDropdown()}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && value.length > 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
