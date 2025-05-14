import { Button, Switch, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FileText, ScrollText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import FileUploadField from "../../../../../components/FileUploadField";
import {
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import { LectureVm, UpdateLectureCommand } from "../../../../../react-query/lecture/lecture.types";
import { useUpdateLecture } from "../../../../../react-query/lecture/lectureHooks";

interface UpdateLectureModalProps {
  opened: boolean;
  onClose: () => void;
  lecture: LectureVm;
}

const UpdateLectureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  video: z
    .instanceof(File, { message: "Promotional video is required" })
    .refine((file) => ALLOWED_VIDEO_TYPES.includes(file.type), {
      message: "Only MP4, WebM, or OGG videos are allowed",
    })
    .refine((file) => file.size <= MAX_VIDEO_SIZE_MB * 1024 * 1024, {
      message: `Video must be less than ${MAX_VIDEO_SIZE_MB}MB`,
    })
    .or(z.string()),
  preview: z.boolean(),
});

type UpdateLectureFormValues = z.infer<typeof UpdateLectureSchema>;

export const UpdateLectureModal = ({ opened, onClose, lecture }: UpdateLectureModalProps) => {
  const initialValues = {
    id: lecture.id,
    title: lecture.title,
    description: lecture.description,
    video: lecture.videoUrl,
    preview: lecture.preview,
  };

  const form = useForm<UpdateLectureFormValues>({
    mode: "uncontrolled",
    initialValues: initialValues,
    validate: zodResolver(UpdateLectureSchema),
  });

  const updateLectureMutation = useUpdateLecture();

  const handleUpdateLecture = (values: UpdateLectureFormValues) => {
    const payload: UpdateLectureCommand = {
      id: values.id,
      title: values.title,
      description: values.description,
      video: values.video instanceof File ? values.video : undefined,
      preview: values.preview,
    };

    console.log("UpdateLectureModal -> handleUpdateLecture -> payload", payload);

    updateLectureMutation.mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
        onClose();
      },
    });
  };

  const video = form.getValues().video;

  return (
    <CusModal opened={opened} onClose={onClose} title="Update Lecture" keepMounted>
      <form className="space-y-6" onSubmit={form.onSubmit(handleUpdateLecture)} noValidate>
        <TextInput
          size="md"
          label="Title"
          placeholder="Lecture title"
          leftSection={<FileText className="size-4 text-gray-500" />}
          {...form.getInputProps("title")}
          key={form.key("title")}
        />

        <Textarea
          size="md"
          label="Description"
          placeholder="Lecture description"
          autosize
          leftSection={<ScrollText className="size-4 text-gray-500" />}
          {...form.getInputProps("description")}
          key={form.key("description")}
        />

        {/* Preview switcher */}
        <Switch
          label="Allow preview for this lecture"
          description="If enabled, this lecture will be available as a free preview."
          size="md"
          {...form.getInputProps("preview", { type: "input" })}
          key={form.key("preview")}
          defaultChecked={lecture.preview}
        />

        <FileUploadField
          previewUrl={typeof video === "string" ? video : undefined}
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
          <Button
            variant="filled"
            loading={updateLectureMutation.isPending}
            type="submit"
            disabled={!form.isDirty()}
          >
            Save
          </Button>
        </div>
      </form>
    </CusModal>
  );
};
