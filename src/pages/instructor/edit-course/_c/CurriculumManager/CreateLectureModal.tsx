import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FileText, ScrollText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import FileUploadField from "../../../../../components/FileUploadField";
import {
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import { CreateLectureCommand } from "../../../../../react-query/lecture/lecture.types";
import { useCreateLecture } from "../../../../../react-query/lecture/lectureHooks";

interface CreateLectureModalProps {
  opened: boolean;
  onClose: () => void;
  sectionId: string;
}

const CreateLectureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video: z
    .instanceof(File, { message: "Video is required" })
    .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
      message: "Only MP4, WebM, or OGG videos are allowed",
    })
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
    }),
});

type CreateLectureFormValues = z.infer<typeof CreateLectureSchema>;

export const CreateLectureModal = ({ opened, onClose, sectionId }: CreateLectureModalProps) => {
  const form = useForm<CreateLectureFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(CreateLectureSchema),
  });

  const createLectureMutation = useCreateLecture();

  const handleCreateLecture = (values: CreateLectureFormValues) => {
    const payload: CreateLectureCommand = {
      sectionId: sectionId,
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

        <FileUploadField
          accept={ALLOWED_VIDEO_TYPES}
          previewMediaType="video"
          description={`Upload a video (MP4, WebM, OGG - max ${MAX_VIDEO_SIZE_MB}MB)`}
          maxSize={MAX_VIDEO_SIZE_MB * 1024 * 1024}
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
