import { ActionIcon, Center, Input, InputWrapper } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { forwardRef, ReactNode } from "react";

interface DraggableTextInputProps {
  description?: string;
  placeholder?: string;
  error?: ReactNode;
  errorProps?: Record<string, any>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onDelete?: () => void;
}

const DraggableTextInput = forwardRef<HTMLInputElement, DraggableTextInputProps>(
  (
    { error, errorProps, value, defaultValue, onChange, placeholder, size = "sm", onDelete },
    ref,
  ) => {
    const [_value, handleChange] = useUncontrolled({
      value,
      defaultValue,
      onChange,
    });

    return (
      <InputWrapper error={error} errorProps={errorProps}>
        <div className="flex items-center gap-2">
          <Input
            ref={ref}
            className="flex-1"
            classNames={{
              wrapper: "m-0", // remove default margin
            }}
            type="text"
            value={_value}
            size={size}
            onChange={(event) => handleChange(event.currentTarget.value)}
            error={error}
            placeholder={placeholder}
          />
          <Center className="cursor-grab">
            <IconGripVertical size={18} />
          </Center>
          <ActionIcon variant="light" color="red" onClick={() => onDelete?.()}>
            <IconTrash size={18} />
          </ActionIcon>
        </div>
        <Input.Error className="text-red-500 font-bold" mt={5} />
      </InputWrapper>
    );
  },
);

DraggableTextInput.displayName = "DraggableTextInput";
export default DraggableTextInput;
