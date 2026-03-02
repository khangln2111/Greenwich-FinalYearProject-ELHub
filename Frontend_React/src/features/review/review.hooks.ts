import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  createReview,
  deleteReview,
  replyToReview,
  updateReview,
  updateReviewReply,
} from "./review.api";
import {
  CreateReviewCommand,
  ReplyToReviewCommand,
  ReviewQueryCriteria,
  UpdateReviewCommand,
  UpdateReviewReplyCommand,
} from "./review.types";

export const useGetReviewsByCourseId = (courseId: string, query?: ReviewQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.reviews.getReviewsByCourseId(courseId, query).queryKey,
    queryFn: keyFac.reviews.getReviewsByCourseId(courseId, query).queryFn,
    enabled: !!courseId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateReviewCommand) => createReview(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.reviews._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments._def });
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Review Created", "Your review has been successfully created");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Not Found", "You must be enrolled in the course to create a review"),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast("Invalid Operation", "You already created a review for this course"),
          },
        ],
      }),
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateReviewCommand) => updateReview(command), // Assuming updateReview is similar to createReview
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.reviews._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments._def });
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Review Updated", "Your review has been successfully updated");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The review not found"),
          },
        ],
      }),
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.reviews._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments._def });
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Review Deleted", "Your review has been successfully deleted");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The review not found"),
          },
        ],
      }),
  });
};

export const useReplyToReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: ReplyToReviewCommand) => replyToReview(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.reviews._def });
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Reply Sent", "Your reply has been successfully sent");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The review not found"),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () => showErrorToast("Invalid Operation", "This review already has a reply"),
          },
        ],
      }),
  });
};

export const useUpdateReviewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateReviewReplyCommand) => updateReviewReply(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.reviews._def });
      queryClient.invalidateQueries({ queryKey: keyFac.courses._def });
      showSuccessToast("Reply Updated", "Your reply has been successfully updated");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () => showErrorToast("Not Found", "The review not found"),
          },
        ],
      }),
  });
};
