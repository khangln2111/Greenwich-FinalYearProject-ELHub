import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Button, Center, DefaultMantineSize, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";

interface SortableInputListProps {
  form: UseFormReturnType<any>;
  field: string;
  label: string;
  placeholderPrefix: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  type: string;
  size?: DefaultMantineSize;
}

const TestSortList = ({
  form,
  field,
  label,
  placeholderPrefix,
  onAdd,
  onRemove,
  type,
  size,
}: SortableInputListProps) => {
  const items = form.getValues()[field];

  return (
    <div>
      <Title order={3}>{label}</Title>
      <Droppable droppableId={field} type={type}>
        {(provided) => (
          <div className="mt-xs" ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item: { id: string; value: string }, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided) => (
                  <div
                    className="mb-4"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                  >
                    <TextInput
                      placeholder={`${placeholderPrefix} ${index + 1}`}
                      {...form.getInputProps(`${field}.${index}.value`)}
                      key={form.key(`${field}.${index}.value`)}
                      size={size}
                      classNames={{
                        wrapper: "flex-1",
                      }}
                      rightSectionPointerEvents="all"
                      inputContainer={(children) => (
                        <div className="flex items-center gap-2 flex-1 w-full">
                          {children}
                          <Center className="cursor-grab" {...draggableProvided.dragHandleProps}>
                            <IconGripVertical size={18} />
                          </Center>
                          <ActionIcon variant="light" color="red" onClick={() => onRemove(index)}>
                            <IconTrash size={18} />
                          </ActionIcon>
                        </div>
                      )}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        leftSection={<IconPlus size={18} />}
        variant="subtle"
        onClick={onAdd}
        className="w-fit"
      >
        Add {placeholderPrefix}
      </Button>
    </div>
  );
};

export default TestSortList;
