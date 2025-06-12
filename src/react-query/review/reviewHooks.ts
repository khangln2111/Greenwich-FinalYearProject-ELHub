import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, deleteReview, getReviewsByCourseId, updateReview } from "./reviewApi";
import { keyFac } from "../common-service/queryKeyFactory";
import { CreateReviewCommand, ReviewQueryCriteria, UpdateReviewCommand } from "./review.types";
import { showErrorToast } from "../../utils/toastHelper";
import { handleApiError } from "../common-service/handleApiError";
import { ErrorCode } from "../../http-client/api.types";

export const useGetReviewsByCourseId = (courseId: string, query?: ReviewQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.reviews.getReviewsByCourseId(courseId, query).queryKey,
    queryFn: () => getReviewsByCourseId(courseId, query),
    enabled: !!courseId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateReviewCommand) => createReview(command),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keyFac.reviews._def,
      });
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
      queryClient.invalidateQueries({
        queryKey: keyFac.reviews._def,
      });
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
      queryClient.invalidateQueries({
        queryKey: keyFac.reviews._def,
      });
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
