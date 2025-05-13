import { Button, TextInput, Textarea, FileInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FileVideo, ScrollText, FileText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import { useCreateLecture } from "../../../../../react-query/lecture/lectureHooks";
import { CreateLectureCommand } from "../../../../../react-query/lecture/lecture.types";

interface CreateLectureModalProps {
  opened: boolean;
  onClose: () => void;
  sectionId: string;
}

const CreateLectureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video: z.instanceof(File).refine((file) => file.size > 0, { message: "Video file is required" }),
});

type CreateLectureFormValues = z.infer<typeof CreateLectureSchema>;

const initialValues: CreateLectureFormValues = {
  title: "",
  description: "",
  video: undefined as unknown as File,
};

export const CreateLectureModal = ({ opened, onClose, sectionId }: CreateLectureModalProps) => {
  const form = useForm<CreateLectureFormValues>({
    mode: "uncontrolled",
    initialValues,
    validate: zodResolver(CreateLectureSchema),
  });

  const createLectureMutation = useCreateLecture();

  const handleCreateLecture = (values: CreateLectureFormValues) => {
    const payload: CreateLectureCommand = {
      sectionId,
      title: values.title,
      description: values.description,
      video: values.video,
    };

    createLectureMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(); // reset form về mặc định
        onClose();
      },
    });
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Create New Lecture" keepMounted>
      <form onSubmit={form.onSubmit(handleCreateLecture)} className="space-y-6" noValidate>
        <TextInput
          size="md"
          label="Title"
          placeholder="Enter lecture title"
          leftSection={<FileText className="size-4 text-gray-500" />}
          {...form.getInputProps("title")}
          key={form.key("title")}
        />

        <Textarea
          size="md"
          label="Description"
          placeholder="Enter lecture description"
          autosize
          leftSection={<ScrollText className="size-4 text-gray-500" />}
          {...form.getInputProps("description")}
          key={form.key("description")}
        />

        <FileInput
          size="md"
          label="Video"
          placeholder="Upload lecture video"
          leftSection={<FileVideo className="size-4 text-gray-500" />}
          accept="video/*"
          {...form.getInputProps("video")}
          key={form.key("video")}
        />

        <div className="flex justify-end gap-4 pt-2">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" variant="filled" loading={createLectureMutation.isPending}>
            Create
          </Button>
        </div>
      </form>
    </CusModal>
  );
};
