import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box, Button, Group, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import FileUploadField from "../../../../../components/media/FileUploadField";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import {
  UpdateCourseOverviewFormSchema,
  UpdateCourseOverviewFormValues,
} from "../../../../../react-query/course/course.schema";
import {
  CourseDetailVm,
  UpdateCourseCommand,
} from "../../../../../react-query/course/course.types";
import { useUpdateCourse } from "../../../../../react-query/course/courseHooks";
import { formSubmitWithFocus } from "../../../../../utils/form";
import SortableInputList from "./SortableInputList";
import TestSortList from "./TestSortList";

type CourseOverviewFormProps = {
  courseDetail: CourseDetailVm;
  courseId: string;
};

const OverviewForm = ({ courseDetail, courseId }: CourseOverviewFormProps) => {
  // using react query to get coruse detail data

  const updateCourseOverviewMutation = useUpdateCourse();

  const initialValues = {
    title: courseDetail.title,
    description: courseDetail.description,
    learningOutcomes:
      courseDetail.learningOutcomes?.map((value) => ({ id: randomId(), value })) ?? [],
    prerequisites: courseDetail.prerequisites?.map((value) => ({ id: randomId(), value })) ?? [],
    image: courseDetail.imageUrl ?? "",
    promoVideo: courseDetail.promoVideoUrl ?? "",
  };

  const form = useForm<UpdateCourseOverviewFormValues>({
    mode: "uncontrolled",
    initialValues: initialValues,
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

  const image = form.getValues().image;
  const promoVideo = form.getValues().promoVideo;

  const handleSubmit = (values: UpdateCourseOverviewFormValues) => {
    const payload: UpdateCourseCommand = {
      id: courseId,
      title: values.title,
      description: values.description,
      learningOutcomes: values.learningOutcomes.map((item) => item.value),
      prerequisites: values.prerequisites.map((item) => item.value),
      image: values.image instanceof File ? values.image : undefined,
      promoVideo: values.promoVideo instanceof File ? values.promoVideo : undefined,
    };
    updateCourseOverviewMutation.mutate(payload, {
      onSuccess: () => {
        form.resetDirty();
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmitWithFocus(form, handleSubmit)}
      className="flex-1 flex flex-col gap-8"
    >
      <div>
        <Title order={3}>Course Title</Title>
        <TextInput
          size="md"
          placeholder="Enter course title"
          mt="xs"
          {...form.getInputProps("title")}
        />
      </div>

      <div>
        <Title order={3}>Course Description</Title>
        <Textarea
          placeholder="Write course overview..."
          autosize
          size="md"
          minRows={4}
          mt="xs"
          {...form.getInputProps("description")}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <TestSortList
          size="md"
          form={form}
          field="learningOutcomes"
          label="What will students learn in your course?"
          placeholderPrefix="Learning Outcome"
          onAdd={addLearning}
          onRemove={removeLearning}
          type="learningOutcomes"
        />

        <SortableInputList
          size="md"
          form={form}
          field="prerequisites"
          label="Course Prerequisites"
          placeholderPrefix="Prerequisite"
          onAdd={addPrerequisite}
          onRemove={removePrerequisite}
          type="prerequisites"
        />
      </DragDropContext>
      <div>
        <Title order={3}>Course Image</Title>
        <FileUploadField
          previewUrl={typeof image === "string" ? image : undefined}
          accept={ALLOWED_IMAGE_TYPES}
          previewMediaType="image"
          description={`Upload an image (JPG, PNG, WEBP - max ${MAX_IMAGE_SIZE_MB}MB)`}
          maxSize={MAX_IMAGE_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("image")}
          key={form.key("image")}
        />
      </div>
      <div className="mt-5">
        <Title order={3}>Course Promo video</Title>
        <FileUploadField
          previewUrl={typeof promoVideo === "string" ? promoVideo : undefined}
          accept={ALLOWED_VIDEO_TYPES}
          previewMediaType="video"
          description={`Upload a video (MP4, WebM, OGG - max ${MAX_VIDEO_SIZE_MB}MB)`}
          maxSize={MAX_VIDEO_SIZE_MB * 1024 * 1024}
          {...form.getInputProps("promoVideo")}
          key={form.key("promoVideo")}
        />
      </div>

      <Group mt="xl" justify="flex-end">
        <Button
          type="submit"
          loading={updateCourseOverviewMutation.isPending}
          disabled={!form.isDirty()}
        >
          Save Overview
        </Button>
      </Group>
    </Box>
  );
};

export default OverviewForm;
