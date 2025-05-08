import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box, Button, Group, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  UpdateCourseOverviewFormSchema,
  UpdateCourseOverviewFormValues,
  UpdateCourseOverviewRequest,
  UpdateCourseOverviewRequestSchema,
} from "../../../../../react-query/course/course.schema";
import SortableInputList from "./SortableInputList";

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
        <SortableInputList
          form={form}
          field="learningOutcomes"
          label="What will students learn in your course?"
          placeholderPrefix="Learning Outcome"
          onAdd={addLearning}
          onRemove={removeLearning}
          type="learningOutcomes"
        />

        <SortableInputList
          form={form}
          field="prerequisites"
          label="Course Prerequisites"
          placeholderPrefix="Prerequisite"
          onAdd={addPrerequisite}
          onRemove={removePrerequisite}
          type="prerequisites"
        />
      </DragDropContext>

      <Group mt="xl" justify="flex-end">
        <Button type="submit">Save Overview</Button>
      </Group>
    </Box>
  );
};

export default OverviewForm;
