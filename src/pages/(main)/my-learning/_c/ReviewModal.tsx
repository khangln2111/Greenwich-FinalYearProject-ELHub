import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import clsx from "clsx";
import { Star } from "lucide-react";
import CusModal from "../../../../components/CusModal/CusModal";
import { zodResolver } from "mantine-form-zod-resolver";
import { CreateReviewFormSchema } from "../../../../features/review/review.schema";

type Review = {
  rating: number;
  comment: string;
};

type Props = {
  opened: boolean;
  onClose: () => void;
  initialReview: Review | null;
  onSave: (review: Review) => void;
};

const ReviewModal = ({ opened, onClose, initialReview, onSave }: Props) => {
  const form = useForm<Review>({
    initialValues: {
      rating: initialReview?.rating ?? 0,
      comment: initialReview?.comment ?? "",
    },
    validate: zodResolver(CreateReviewFormSchema),
  });

  const handleSubmit = (values: Review) => {
    onSave(values);
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Rate this course">
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => form.setFieldValue("rating", star)}
              onMouseEnter={() => form.setFieldValue("rating", star)}
              className={clsx(
                "w-6 h-6 cursor-pointer transition-colors",
                form.values.rating >= star
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-zinc-400 dark:stroke-zinc-500",
              )}
            />
          ))}
        </div>
        {form.errors.rating && <p className="text-sm text-red-500">{form.errors.rating}</p>}

        {/* Comment */}
        <Textarea
          placeholder="Write your feedback..."
          {...form.getInputProps("comment")}
          key={form.key("comment")}
          autosize
          minRows={3}
          classNames={{
            input:
              "bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-300 dark:border-zinc-600",
          }}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Submit Review</Button>
        </div>
      </form>
    </CusModal>
  );
};

export default ReviewModal;
