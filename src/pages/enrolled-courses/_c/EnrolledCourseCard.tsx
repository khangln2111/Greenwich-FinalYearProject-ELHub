import { Avatar, Button, Progress, Rating, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Play, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CusModal from "../../../components/CusModal";
import { EnrollmentVm } from "../../../react-query/enrollment/enrollment.types";
import { CreateReviewCommand, UpdateReviewCommand } from "../../../react-query/review/review.types";
import {
  useCreateReview,
  useDeleteReview,
  useUpdateReview,
} from "../../../react-query/review/reviewHooks";
import { formSubmitWithFocus } from "../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";

interface EnrolledCourseCardProps {
  enrollment: EnrollmentVm;
}

export const CreateReviewFormSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1000, "Content cannot exceed 1000 characters"),
});

export type CreateReviewFormValues = z.infer<typeof CreateReviewFormSchema>;

export default function EnrolledCourseCard({ enrollment }: EnrolledCourseCardProps) {
  const navigate = useNavigate();
  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview(); // Assuming you have a delete review mutation
  const [createReviewModalOpened, setCreateReviewModalOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CreateReviewFormValues>({
    mode: "uncontrolled",
    validate: zodResolver(CreateReviewFormSchema),
  });

  const handleNavigateToLearningPage = () => {
    navigate(`/learning/${enrollment.courseId}`);
  };

  const handleSubmitReview = (values: CreateReviewFormValues) => {
    if (isEditing && enrollment.review) {
      const payload: UpdateReviewCommand = {
        id: enrollment.review.id,
        rating: values.rating,
        content: values.content,
      };

      updateReviewMutation.mutate(payload, {
        onSuccess: () => {
          setCreateReviewModalOpened(false);
        },
      });
    } else {
      const payload: CreateReviewCommand = {
        courseId: enrollment.courseId,
        rating: values.rating,
        content: values.content,
      };

      createReviewMutation.mutate(payload, {
        onSuccess: () => {
          setCreateReviewModalOpened(false);
        },
      });
    }
  };

  return (
    <>
      <CusModal
        size="600px"
        opened={createReviewModalOpened}
        onClose={() => setCreateReviewModalOpened(false)}
        title={isEditing ? "Edit your review" : "How would you rate this course?"}
      >
        <div className="flex flex-col gap-4 pt-2">
          <Rating
            size="xl"
            count={5}
            color="yellow"
            className="self-center"
            {...form.getInputProps("rating")}
            key={form.key("rating")}
          />
          <Textarea
            placeholder="Tell us about your experience with this course. Was it helpful? What did you like or dislike?"
            autosize
            size="md"
            minRows={5}
            maxRows={5}
            className="mt-4"
            classNames={{
              input: "placeholder:text-gray-600 dark:placeholder:text-gray-400",
            }}
            {...form.getInputProps("content")}
            key={form.key("content")}
          />
          <div className="flex justify-end gap-2">
            {enrollment.review && (
              <Button
                variant="subtle"
                onClick={() => {
                  if (enrollment.review?.id) {
                    deleteReviewMutation.mutate(enrollment.review.id, {
                      onSuccess: () => {
                        setCreateReviewModalOpened(false);
                        form.reset();
                      },
                    });
                  }
                }}
              >
                Delete
              </Button>
            )}
            <Button
              loading={createReviewMutation.isPending || updateReviewMutation.isPending}
              onClick={formSubmitWithFocus(form, handleSubmitReview)}
              className="self-end"
            >
              {isEditing ? "Edit Review" : "Submit"}
            </Button>
          </div>
        </div>
      </CusModal>

      <div
        className="bg-body rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300
          overflow-hidden flex flex-col group p-4"
      >
        {/* Image Section */}
        <div
          className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
          onClick={handleNavigateToLearningPage}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleNavigateToLearningPage();
          }}
        >
          <img
            src={enrollment.courseImageUrl}
            alt={enrollment.courseTitle}
            className="w-full h-full object-cover transition-transform duration-300"
            draggable={false}
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0
              group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-dark-4 bg-opacity-90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Play size={28} className="text-gray-800 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 flex-1 mt-4">
          <div className="flex-1">
            <h3
              className="text-lg font-semibold line-clamp-2 cursor-pointer"
              onClick={handleNavigateToLearningPage}
            >
              {enrollment.courseTitle}
            </h3>
            <div className="flex gap-2 items-center mt-2">
              <Avatar
                allowedInitialsColors={["red", "blue", "cyan"]}
                color="initials"
                size="sm"
                radius="xl"
                name="Nguyen Khang"
              />
              <Text className="text-gray-500 text-sm dark:text-gray-400">
                by <span className="font-semibold">Nguyen Khang</span>
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-md text-gray-500 dark:text-gray-400">
              <span>Complete</span>
              <span>{enrollment.progressPercentage}%</span>
            </div>
            <Progress value={enrollment.progressPercentage} size="md" striped radius="xl" />
          </div>

          <div className="flex items-center justify-between mt-2">
            <Rating value={enrollment.review?.rating ?? 0} readOnly size="xs" />

            <Button
              variant="outline"
              radius="lg"
              color="gray"
              leftSection={<Star size={14} />}
              onClick={(e) => {
                e.stopPropagation();
                if (enrollment.review) {
                  setIsEditing(true);
                  form.setValues({
                    rating: enrollment.review.rating,
                    content: enrollment.review.content,
                  });
                } else {
                  setIsEditing(false);
                  form.reset();
                }
                setCreateReviewModalOpened(true);
              }}
            >
              {enrollment.review ? "Edit your review" : "Leave a review"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
