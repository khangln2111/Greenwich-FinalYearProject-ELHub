import { Button, Textarea } from "@mantine/core";
import clsx from "clsx";
import { Star } from "lucide-react";
import { useState } from "react";
import CusModal from "../../../components/CusModal";

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
  const [rating, setRating] = useState(initialReview?.rating ?? 0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [comment, setComment] = useState(initialReview?.comment ?? "");

  const handleSubmit = () => {
    if (rating === 0) return alert("Please select a rating");
    onSave({ rating, comment });
  };

  return (
    <CusModal opened={opened} onClose={onClose} title="Rate this course">
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setRating(star)}
              className={clsx(
                "w-6 h-6 cursor-pointer transition-colors",
                (hovered ?? rating) >= star
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-zinc-400 dark:stroke-zinc-500",
              )}
            />
          ))}
        </div>

        <Textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          autosize
          minRows={3}
          classNames={{
            input:
              "bg-white dark:bg-zinc-800 text-black dark:text-white border-zinc-300 dark:border-zinc-600",
          }}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Review</Button>
        </div>
      </div>
    </CusModal>
  );
};

export default ReviewModal;
