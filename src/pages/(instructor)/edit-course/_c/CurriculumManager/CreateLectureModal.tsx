import { Button, Switch, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EyeIcon, EyeOffIcon, FileText, ScrollText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import FileUploadField from "../../../../../components/media/FileUploadField";
import {
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import { CreateLectureCommand } from "../../../../../react-query/lecture/lecture.types";
import { useCreateLecture } from "../../../../../react-query/lecture/lectureHooks";
import { formSubmitWithFocus } from "../../../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";

const CreateLectureSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1, "Title must be at least 1 character"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character"),
  isPreview: z.boolean().default(false),
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

interface CreateLectureModalProps {
  opened: boolean;
  onClose: () => void;
  sectionId: string;
}

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
      isPreview: values.isPreview ?? false,
    };

    createLectureMutation.mutate(payload, {
      onSuccess: () => {
        form.reset(); // reset form về mặc định
        onClose();
      },
    });
  };

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Create New Lecture"
      keepMounted
      footer={
        <div className="flex gap-4 justify-end items-center">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="filled"
            loading={createLectureMutation.isPending}
            type="submit"
            onClick={formSubmitWithFocus(form, handleCreateLecture)}
          >
            Save
          </Button>
        </div>
      }
    >
      <form className="flex flex-col gap-y-6" noValidate>
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

        {/* Preview switch */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2"></div>
          <Text className="font-medium text-md">Allow preview</Text>

          <Switch
            color="teal"
            labelPosition="right"
            description="If enabled, this lecture will be available as a free preview."
            size="lg"
            onLabel={<EyeIcon size={16} />}
            offLabel={<EyeOffIcon size={16} />}
            {...form.getInputProps("isPreview", { type: "input" })}
            key={form.key("isPreview")}
            defaultChecked={form.getValues().isPreview}
          />
        </div>

        <FileUploadField
          accept={ALLOWED_VIDEO_TYPES}
          previewMediaType="video"
          description={`Upload a video (MP4, WebM, OGG - max ${MAX_VIDEO_SIZE_MB}MB)`}
          maxSize={MAX_VIDEO_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("video")}
          key={form.key("video")}
        />
      </form>
    </CusModal>
  );
};
