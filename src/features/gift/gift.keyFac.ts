import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GiftQueryCriteria } from "./gift.types";

export const giftKeyFac = createQueryKeys("gifts", {
  getSentGifts: (query?: GiftQueryCriteria) => ({
    queryKey: ["gifts", "sent", query],
  }),
  getReceivedGifts: (query?: GiftQueryCriteria) => ({
    queryKey: ["gifts", "received", query],
  }),
});
