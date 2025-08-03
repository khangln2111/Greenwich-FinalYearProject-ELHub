import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import {
  changeGiftReceiver,
  createGift,
  getReceivedGifts,
  getSentGifts,
  redeemGift,
  revokeGift,
} from "./giftApi";
import { ChangeGiftReceiverCommand, CreateGiftCommand } from "./gift.types";
import { handleApiError } from "../common-service/handleApiError";
import { showErrorToast, showSuccessToast } from "../../utils/toastHelper";
import { ErrorCode } from "../../http-client/api.types";

export const useGetSentGifts = () => {
  return useQuery({
    queryKey: keyFac.gifts.getSentGifts.queryKey,
    queryFn: getSentGifts,
  });
};

export const useGetReceivedGifts = () => {
  return useQuery({
    queryKey: keyFac.gifts.getReceivedGifts.queryKey,
    queryFn: getReceivedGifts,
  });
};

export const useCreateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: CreateGiftCommand) => createGift(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts.queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts.queryKey });
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
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts.queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts.queryKey });
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
    mutationFn: (giftId: string) => revokeGift(giftId), // Assuming revokeGift is similar to redeemGift
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts.queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts.queryKey });
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
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getSentGifts.queryKey });
      queryClient.invalidateQueries({ queryKey: keyFac.gifts.getReceivedGifts.queryKey });
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
