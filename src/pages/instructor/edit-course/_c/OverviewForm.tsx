import { Box, Button, Group, Stack, TextInput, Textarea, Title, ActionIcon } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
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

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit || (() => {}))} className="space-y-6">
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

      <div>
        <Title order={3}>What will students learn in your course?</Title>
        <Stack gap="sm" mt="xs">
          {form.values.learningOutcomes.map((_, index) => (
            <div className="flex items-center gap-3" key={index}>
              <TextInput
                placeholder={`Outcome ${index + 1}`}
                className="flex-1"
                {...form.getInputProps(`learningOutcomes.${index}`)}
              />
              <ActionIcon onClick={() => removeLearning(index)} variant="light" color="red">
                <IconTrash size={18} />
              </ActionIcon>
            </div>
          ))}
          <Button
            leftSection={<IconPlus size={18} />}
            variant="subtle"
            onClick={addLearning}
            className="w-fit"
          >
            Add Learning Outcome
          </Button>
        </Stack>
      </div>

      <div>
        <Title order={3}>Course Prerequisites</Title>
        <Stack gap="sm" mt="xs">
          {form.values.prerequisites.map((_, index) => (
            <Group key={index} align="flex-start">
              <TextInput
                placeholder={`Prerequisite ${index + 1}`}
                className="flex-1"
                {...form.getInputProps(`prerequisites.${index}`)}
              />
              <ActionIcon
                onClick={() => removePrerequisite(index)}
                variant="light"
                color="red"
                mt="sm"
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          ))}
          <Button
            leftSection={<IconPlus size={18} />}
            variant="light"
            onClick={addPrerequisite}
            className="w-fit"
          >
            Add Prerequisite
          </Button>
        </Stack>
      </div>

      <Group mt="xl" justify="flex-end">
        <Button type="submit">Save Overview</Button>
      </Group>
    </Box>
  );
};

export default OverviewForm;
