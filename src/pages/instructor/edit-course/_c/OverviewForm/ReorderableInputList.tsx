import { ActionIcon, Button, Center, TextInput, Title } from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import React from "react";

type Props = {
  label: string;
  values: string[];
  error?: string | string[];
  onChange: (newValues: string[]) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  getInputProps: (index: number) => any;
  type: string;
};

export const ReorderableInputList: React.FC<Props> = ({
  label,
  values,
  error,
  onChange,
  onAdd,
  onRemove,
  getInputProps,
  type,
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updated = [...values];
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    onChange(updated);
  };

  return (
    <div>
      <Title order={3}>{label}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={type} type={type}>
          {(provided) => (
            <div className="mt-xs" ref={provided.innerRef} {...provided.droppableProps}>
              {values.map((_, index) => (
                <Draggable key={`${type}-${index}`} draggableId={`${type}-${index}`} index={index}>
                  {(draggableProvided) => (
                    <div
                      className="mb-4"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                    >
                      <TextInput
                        {...getInputProps(index)}
                        placeholder={`${label} ${index + 1}`}
                        leftSection={
                          <Center {...draggableProvided.dragHandleProps} className="cursor-grab">
                            <IconGripVertical size={18} />
                          </Center>
                        }
                        leftSectionPointerEvents="all"
                        rightSection={
                          <ActionIcon onClick={() => onRemove(index)} variant="light" color="red">
                            <IconTrash size={18} />
                          </ActionIcon>
                        }
                        rightSectionPointerEvents="all"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        leftSection={<IconPlus size={18} />}
        variant="subtle"
        onClick={onAdd}
        className="w-fit"
      >
        Add
      </Button>
      {error && typeof error === "string" && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};
