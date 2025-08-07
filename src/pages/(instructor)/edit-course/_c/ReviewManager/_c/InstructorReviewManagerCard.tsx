import { Button, Group, Rating, Text, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import avatarPlaceholder from "../../../../../../assets/placeholder/profile-avatar-placeholder.svg";
import { ReviewVm } from "../../../../../../features/review/review.types";
import {
  useReplyToReview,
  useUpdateReviewReply,
} from "../../../../../../features/review/reviewHooks";
import { cn } from "../../../../../../utils/cn";

interface InstructorReviewManagerCardProps {
  review: ReviewVm;
  className?: string;
}

const InstructorReviewManagerCard = ({ review, className }: InstructorReviewManagerCardProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const [isEditingReply, setIsEditingReply] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState(review.reply?.content ?? "");

  const replyMutation = useReplyToReview();
  const updateReplyMutation = useUpdateReviewReply();

  const handleReply = () => {
    replyMutation.mutate(
      {
        id: review.id,
        content: replyContent.trim(),
      },
      {
        onSuccess: () => {
          setIsReplying(false);
          setReplyContent("");
        },
      },
    );
  };

  const handleUpdateReply = () => {
    updateReplyMutation.mutate(
      {
        id: review.reply?.id ?? "",
        content: editedReplyContent.trim(),
      },
      {
        onSuccess: () => {
          setIsEditingReply(false);
        },
      },
    );
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-sm bg-body flex flex-col gap-3 w-full",
        className,
      )}
    >
      {/* Review header */}
      <div className="flex items-center gap-4">
        <img
          src={review.userAvatarUrl || avatarPlaceholder}
          alt="User avatar"
          className="size-16 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col gap-1 md:gap-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xl font-medium">{review.userFullName}</p>
            <Rating value={review.rating} readOnly size="md" />
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-2">
            {dayjs(review.updatedAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Review content */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.content}</p>
      </div>

      {/* Reply section */}
      {review.reply ? (
        <div className="border-l-4 border-primary-6 pl-4 mt-2">
          <div className="flex items-start justify-between">
            <Text className="text-sm text-gray-600 dark:text-dark-3 italic mb-1">
              Replied {dayjs(review.reply.updatedAt).fromNow()}
            </Text>
            {!isEditingReply && (
              <Button
                size="xs"
                variant="subtle"
                onClick={() => {
                  setEditedReplyContent(review.reply?.content ?? "");
                  setIsEditingReply(true);
                }}
              >
                Edit
              </Button>
            )}
          </div>

          {isEditingReply ? (
            <div className="flex flex-col gap-2 mt-1">
              <Textarea
                value={editedReplyContent}
                onChange={(e) => setEditedReplyContent(e.currentTarget.value)}
                autosize
                minRows={2}
              />
              <Group justify="flex-end" gap="sm">
                <Button variant="outline" size="xs" onClick={() => setIsEditingReply(false)}>
                  Cancel
                </Button>
                <Button
                  size="xs"
                  loading={updateReplyMutation.isPending}
                  disabled={!editedReplyContent.trim()}
                  onClick={handleUpdateReply}
                >
                  Update Reply
                </Button>
              </Group>
            </div>
          ) : (
            <Text className="text-gray-800 dark:text-gray-100 mt-1">{review.reply.content}</Text>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {isReplying ? (
            <>
              <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.currentTarget.value)}
                autosize
                minRows={2}
              />
              <Group justify="flex-end" gap="sm">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="xs"
                  loading={replyMutation.isPending}
                  disabled={!replyContent.trim()}
                  onClick={handleReply}
                >
                  Send Reply
                </Button>
              </Group>
            </>
          ) : (
            <Button
              variant="light"
              size="xs"
              className="self-start"
              onClick={() => setIsReplying(true)}
            >
              Reply to this review
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorReviewManagerCard;
