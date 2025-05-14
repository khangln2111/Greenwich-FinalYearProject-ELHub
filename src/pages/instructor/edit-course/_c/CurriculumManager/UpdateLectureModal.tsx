import { Button, Switch, Text, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { EyeIcon, EyeOffIcon, FileText, ScrollText } from "lucide-react";
import { z } from "zod";
import CusModal from "../../../../../components/CusModal";
import FileUploadField from "../../../../../components/media/FileUploadField";
import {
  ALLOWED_VIDEO_TYPES,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import { LectureVm, UpdateLectureCommand } from "../../../../../react-query/lecture/lecture.types";
import { useUpdateLecture } from "../../../../../react-query/lecture/lectureHooks";
import { formSubmitWithFocus } from "../../../../../utils/form";

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

    updateLectureMutation.mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
        onClose();
      },
    });
  };

  const video = form.getValues().video;

  return (
    <CusModal
      opened={opened}
      onClose={onClose}
      title="Edit Lecture"
      keepMounted
      footer={
        <div className="flex gap-4 justify-end items-center">
          <Button variant="subtle" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="filled"
            loading={updateLectureMutation.isPending}
            type="submit"
            disabled={!form.isDirty()}
            onClick={() => formSubmitWithFocus(form, handleUpdateLecture)()}
          >
            Save
          </Button>
        </div>
      }
    >
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
            {...form.getInputProps("preview", { type: "input" })}
            key={form.key("preview")}
            defaultChecked={form.getValues().preview}
          />
        </div>

        <FileUploadField
          previewUrl={typeof video === "string" ? video : undefined}
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
