import { createQueryKeys } from "@lukemorales/query-key-factory";
import { GiftQueryCriteria } from "./gift.types";
import { getReceivedGifts, getSentGifts } from "./gift.api";

export const giftKeyFac = createQueryKeys("gifts", {
  getSentGifts: (query?: GiftQueryCriteria) => ({
    queryKey: ["gifts", "sent", query],
    queryFn: () => getSentGifts(query),
  }),
  getReceivedGifts: (query?: GiftQueryCriteria) => ({
    queryKey: ["gifts", "received", query],
    queryFn: () => getReceivedGifts(query),
  }),
});
