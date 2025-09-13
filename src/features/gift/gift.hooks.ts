import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorCode } from "../../api-client/api.types";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { useAuthStore } from "../../zustand/stores/authStore";
import { handleApiError } from "../common-service/handleApiError";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  changeGiftReceiver,
  createGift,
  getReceivedGifts,
  getSentGifts,
  redeemGift,
  revokeGift,
} from "./gift.api";
import { ChangeGiftReceiverCommand, CreateGiftCommand, GiftQueryCriteria } from "./gift.types";

export const useGetSentGifts = (query?: GiftQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.gifts.getSentGifts(query).queryKey,
    queryFn: () => getSentGifts(query),
  });
};

export const useGetReceivedGifts = (query?: GiftQueryCriteria) => {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    enabled: !!accessToken,
    queryKey: keyFac.gifts.getReceivedGifts(query).queryKey,
    queryFn: () => getReceivedGifts(query),
  });
};

export const useCreateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateGiftCommand) => createGift(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments.getEnrollmentsSelf._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories.getInventoryItemsSelf._def });
      showSuccessToast("Gift Sent", "Your gift has been sent successfully!");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 400,
            errorCode: ErrorCode.NoInventoryLeft,
            handler: () =>
              showErrorToast("No Inventory Left", "No remaining quantity for this item"),
          },
          {
            status: 400,
            errorCode: ErrorCode.CourseAlreadyEnrolled,
            handler: () =>
              showErrorToast(
                "Already enrolled",
                "The receiver is already enrolled in this course.",
              ),
          },
        ],
      }),
  });
};

export const useRedeemGift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (giftId: string) => redeemGift(giftId),
    onSuccess: () => {
      showSuccessToast("Gift Redeemed", "The gift has been redeemed successfully!");
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments.getEnrollmentsSelf._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories.getInventoryItemsSelf._def });
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Gift Not Found", "The gift you are trying to redeem does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.GiftUnavailable,
            handler: () =>
              showErrorToast("Gift Unvailable", "This gift has already been redeemed or revoked."),
          },
          {
            status: 400,
            errorCode: ErrorCode.CourseAlreadyEnrolled,
            handler: () =>
              showErrorToast("Already Enrolled", "You are already enrolled in this course."),
          },
        ],
      }),
  });
};

export const useRevokeGift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (giftId: string) => revokeGift(giftId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.enrollments.getEnrollmentsSelf._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories.getInventoryItemsSelf._def });
      showSuccessToast("Gift Revoked", "The gift has been revoked successfully!");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Gift Not Found", "The gift you are trying to revoke does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.GiftUnavailable,
            handler: () =>
              showErrorToast("Gift Unavailable", "This gift has already been redeemed or revoked."),
          },
          {
            status: 400,
            errorCode: ErrorCode.InvalidOperation,
            handler: () =>
              showErrorToast(
                "Invalid Operation",
                "The associated inventory item could not be found",
              ),
          },
        ],
      }),
  });
};

export const useChangeGiftReceiver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: ChangeGiftReceiverCommand) => changeGiftReceiver(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts._def });
      queryClient.invalidateQueries({ queryKey: keyFac.inventories.getInventoryItemsSelf._def });
      showSuccessToast("Receiver Changed", "The gift receiver has been changed successfully!");
    },
    onError: (error) =>
      handleApiError(error, {
        matchers: [
          {
            status: 404,
            handler: () =>
              showErrorToast("Gift Not Found", "The gift you are trying to change does not exist."),
          },
          {
            status: 400,
            errorCode: ErrorCode.GiftUnavailable,
            handler: () =>
              showErrorToast("Gift Unavailable", "This gift has already been redeemed or revoked."),
          },
        ],
      }),
  });
};
