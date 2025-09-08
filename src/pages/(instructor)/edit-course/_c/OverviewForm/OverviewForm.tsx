import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box, Button, Group, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { ArrowUpNarrowWide, DollarSign, TicketPercent } from "lucide-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { EditorInput } from "../../../../../components/inputs/EditorInput";
import FileUploadField from "../../../../../components/media/FileUploadField";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from "../../../../../constants/ValidationConstants";
import {
  UpdateCourseOverviewFormValues,
  updateCourseOverviewSchema,
} from "../../../../../features/course/course.schema";
import {
  CourseDetailVm,
  CourseLevel,
  UpdateCourseCommand,
} from "../../../../../features/course/course.types";
import { useUpdateCourse } from "../../../../../features/course/course.hooks";
import { formSubmitWithFocus } from "../../../../../utils/form";
import SortableInputList from "./SortableInputList";
import TestSortList from "./TestSortList";
import { Editor } from "@tiptap/react";
import { useRef } from "react";
import { cn } from "../../../../../utils/cn";

type CourseOverviewFormProps = {
  courseDetail: CourseDetailVm;
  courseId: string;
  className?: string;
};

const OverviewForm = ({ courseDetail, courseId, className }: CourseOverviewFormProps) => {
  const updateCourseOverviewMutation = useUpdateCourse();
  const descriptionEditorRef = useRef<Editor | null>(null);
  const form = useForm<UpdateCourseOverviewFormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: courseDetail.title,
      summary: courseDetail.summary,
      description: courseDetail.description,
      learningOutcomes:
        courseDetail.learningOutcomes?.map((value) => ({ id: randomId(), value })) ?? [],
      prerequisites: courseDetail.prerequisites?.map((value) => ({ id: randomId(), value })) ?? [],
      image: courseDetail.imageUrl ?? "",
      promoVideo: courseDetail.promoVideoUrl ?? "",
      level: courseDetail.level ?? CourseLevel.Beginner,
      discountedPrice: courseDetail.discountedPrice ?? 0,
      price: courseDetail.price ?? 0,
    },
    validate: zodResolver(updateCourseOverviewSchema),
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
      summary: values.summary,
      description: descriptionEditorRef.current?.getHTML() || "",
      learningOutcomes: values.learningOutcomes.map((item) => item.value),
      prerequisites: values.prerequisites.map((item) => item.value),
      image: values.image instanceof File ? values.image : undefined,
      promoVideo: values.promoVideo instanceof File ? values.promoVideo : undefined,
      level: values.level,
      price: values.price,
      discountedPrice: values.discountedPrice,
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
      className={cn("flex-1 flex flex-col gap-12", className)}
    >
      <div>
        <Title order={3}>Course Title</Title>
        <TextInput
          description="Your title should be a mix of attention-grabbing, informative, and optimized for search"
          maxLength={100}
          size="md"
          placeholder="Enter course title"
          mt="xs"
          key={form.key("title")}
          {...form.getInputProps("title")}
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
      </div>
      <div>
        <Title order={3}>Course Summary</Title>
        <TextInput
          description="Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course."
          maxLength={100}
          size="md"
          placeholder="Enter course summary"
          mt="xs"
          key={form.key("summary")}
          {...form.getInputProps("summary")}
          inputWrapperOrder={["label", "input", "description", "error"]}
        />
      </div>

      <div>
        <Title order={3}>Pricing</Title>
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 mt-xs">
          <NumberInput
            size="md"
            min={0}
            clampBehavior="strict"
            label="Price"
            placeholder="e.g: 199.99"
            {...form.getInputProps("price")}
            key={form.key("price")}
            leftSection={<DollarSign className="size-4 text-gray-500" />}
            className="max-w-sm"
            inputWrapperOrder={["label", "input", "description", "error"]}
          />
          <NumberInput
            size="md"
            min={0}
            clampBehavior="strict"
            label="Discounted Price"
            placeholder="e.g: 99.99 (must be less than price)"
            key={form.key("discountedPrice")}
            {...form.getInputProps("discountedPrice")}
            leftSection={<TicketPercent className="size-4 text-gray-500" />}
            className="max-w-sm"
            inputWrapperOrder={["label", "input", "description", "error"]}
          />
        </div>
      </div>

      <div>
        <Title order={3}>Course Level</Title>
        <Select
          key={form.key("level")}
          {...form.getInputProps("level")}
          data={[
            { label: "Beginner", value: CourseLevel.Beginner },
            { label: "Intermediate", value: CourseLevel.Intermediate },
            { label: "Advanced", value: CourseLevel.Advanced },
            { label: "All Levels", value: CourseLevel.All },
          ]}
          size="md"
          placeholder="Select: Beginner, Intermediate, Advanced, All Levels"
          leftSection={<ArrowUpNarrowWide className="size-4" />}
          checkIconPosition="right"
          className="max-w-lg mt-xs"
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
        <Title order={3}>Course Description</Title>
        <div className="mt-xs">
          <EditorInput
            key={form.key("description")}
            {...form.getInputProps("description")}
            placeholder="Write course overview..."
            editorRef={descriptionEditorRef}
          />
        </div>
      </div>

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
