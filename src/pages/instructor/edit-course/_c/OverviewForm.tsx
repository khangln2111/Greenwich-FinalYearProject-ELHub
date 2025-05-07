import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ActionIcon, Box, Button, Center, Group, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { z } from "zod";

const overviewSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Course description is required"),
  learningOutcomes: z.array(z.string().min(1, "Cannot be empty")),
  prerequisites: z.array(z.string().min(1, "Cannot be empty")),
});

type OverviewFormValues = z.infer<typeof overviewSchema>;

const OverviewForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: OverviewFormValues;
  onSubmit?: (values: OverviewFormValues, event?: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const form = useForm<OverviewFormValues>({
    initialValues: defaultValues || {
      title: "",
      description: "",
      learningOutcomes: [""],
      prerequisites: [""],
    },
    validate: zodResolver(overviewSchema),
  });

  const addLearning = () => form.insertListItem("learningOutcomes", "");
  const removeLearning = (index: number) => form.removeListItem("learningOutcomes", index);

  const addPrerequisite = () => form.insertListItem("prerequisites", "");
  const removePrerequisite = (index: number) => form.removeListItem("prerequisites", index);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (result.type === "learningOutcomes") {
      form.reorderListItem("learningOutcomes", {
        from: source.index,
        to: destination.index,
      });
    }

    if (result.type === "prerequisites") {
      form.reorderListItem("prerequisites", {
        from: source.index,
        to: destination.index,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(
        onSubmit ||
          (() => {
            // Default submit handler
            console.log("Form submitted", form.values);
          }),
      )}
      className="flex-1 flex flex-col gap-6"
    >
      <div>
        <Title order={3}>Course Title</Title>
        <TextInput placeholder="Enter course title" mt="xs" {...form.getInputProps("title")} />
      </div>

      <div>
        <Title order={3}>Course Description</Title>
        <Textarea
          placeholder="Write course overview..."
          autosize
          minRows={4}
          mt="xs"
          {...form.getInputProps("description")}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Learning Outcomes */}
        <div>
          <Title order={3}>What will students learn in your course?</Title>
          <Droppable droppableId="learningOutcomes" type="learningOutcomes">
            {(provided) => (
              <div className="mt-xs" {...provided.droppableProps} ref={provided.innerRef}>
                {form.getValues().learningOutcomes.map((_, index) => (
                  <Draggable
                    key={`learning-${index}`}
                    index={index}
                    draggableId={`learning-${index}`}
                  >
                    {(draggableProvided) => (
                      <div
                        className="mb-4"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TextInput
                          placeholder={`Learning Outcome ${index + 1}`}
                          {...form.getInputProps(`learningOutcomes.${index}`)}
                          key={form.key(`learningOutcomes.${index}`)}
                          leftSection={
                            <Center {...draggableProvided.dragHandleProps} className="cursor-grab">
                              <IconGripVertical size={18} />
                            </Center>
                          }
                          leftSectionPointerEvents="all"
                          rightSection={
                            <ActionIcon
                              onClick={() => removeLearning(index)}
                              variant="light"
                              color="red"
                            >
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
          <Button
            leftSection={<IconPlus size={18} />}
            variant="subtle"
            onClick={addLearning}
            className="w-fit"
          >
            Add Learning Outcome
          </Button>
        </div>

        {/* Prerequisites */}
        <div>
          <Title order={3}>Course Prerequisites</Title>
          <Droppable droppableId="prerequisites" type="prerequisites" direction="vertical">
            {(provided) => (
              <div className="mt-xs" {...provided.droppableProps} ref={provided.innerRef}>
                {form.getValues().prerequisites.map((_, index) => (
                  <Draggable
                    key={`prerequisite-${index}`}
                    draggableId={`prerequisite-${index}`}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <div
                        className="mb-4"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TextInput
                          {...form.getInputProps(`prerequisites.${index}`)}
                          key={form.key(`prerequisites.${index}`)}
                          placeholder={`Prerequisite ${index + 1}`}
                          className="flex-1"
                          leftSection={
                            <Center {...draggableProvided.dragHandleProps} className="cursor-grab">
                              <IconGripVertical size={18} />
                            </Center>
                          }
                          leftSectionPointerEvents="all"
                          rightSection={
                            <ActionIcon
                              onClick={() => removePrerequisite(index)}
                              variant="subtle"
                              color="red"
                            >
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
          <Button
            leftSection={<IconPlus size={18} />}
            variant="subtle"
            onClick={addPrerequisite}
            className="w-fit"
          >
            Add Prerequisite
          </Button>
        </div>
      </DragDropContext>

      <Group mt="xl" justify="flex-end">
        <Button type="submit">Save Overview</Button>
      </Group>
    </Box>
  );
};

export default OverviewForm;
