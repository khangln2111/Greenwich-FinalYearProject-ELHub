import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { ActionIcon, Box, Button, Center, Group, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  UpdateCourseOverviewFormSchema,
  UpdateCourseOverviewFormValues,
  UpdateCourseOverviewRequest,
  UpdateCourseOverviewRequestSchema,
} from "../../../../react-query/course/course.schema";

const OverviewForm = ({
  defaultValues,
  courseId,
}: {
  defaultValues?: UpdateCourseOverviewFormValues;
  courseId: string;
}) => {
  const form = useForm<UpdateCourseOverviewFormValues>({
    mode: "uncontrolled",
    initialValues: defaultValues || {
      title: "",
      description: "",
      learningOutcomes: [{ id: randomId(), value: "" }],
      prerequisites: [{ id: randomId(), value: "" }],
      image: "",
      promoVideo: "",
    },
    validate: zodResolver(UpdateCourseOverviewFormSchema),
  });

  const addLearning = () => form.insertListItem("learningOutcomes", { id: randomId(), value: "" });
  const removeLearning = (index: number) => form.removeListItem("learningOutcomes", index);

  const addPrerequisite = () => form.insertListItem("prerequisites", { id: randomId(), value: "" });
  const removePrerequisite = (index: number) => form.removeListItem("prerequisites", index);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const type = result.type;
    if (type === "learningOutcomes") {
      form.reorderListItem("learningOutcomes", {
        from: source.index,
        to: destination.index,
      });
    } else if (type === "prerequisites") {
      form.reorderListItem("prerequisites", {
        from: source.index,
        to: destination.index,
      });
    }
  };

  const handleSubmit = (values: UpdateCourseOverviewFormValues) => {
    const payload: UpdateCourseOverviewRequest = UpdateCourseOverviewRequestSchema.parse(values);
    console.log(payload);
  };

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
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
                {form.getValues().learningOutcomes.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="mb-4"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TextInput
                          placeholder={`Learning Outcome ${index + 1}`}
                          {...form.getInputProps(`learningOutcomes.${index}.value`)}
                          key={form.key(`learningOutcomes.${index}.value`)}
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
          <Droppable droppableId="prerequisites" type="prerequisites">
            {(provided) => (
              <div className="mt-xs" {...provided.droppableProps} ref={provided.innerRef}>
                {form.getValues().prerequisites.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="mb-4"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                      >
                        <TextInput
                          placeholder={`Prerequisite ${index + 1}`}
                          {...form.getInputProps(`prerequisites.${index}.value`)}
                          key={form.key(`prerequisites.${index}.value`)}
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
