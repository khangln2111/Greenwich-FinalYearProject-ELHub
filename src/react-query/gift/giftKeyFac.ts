import { createQueryKeys } from "@lukemorales/query-key-factory";

export const giftKeyFac = createQueryKeys("gifts", {
  getSentGifts: {
    queryKey: null,
  },
  getReceivedGifts: {
    queryKey: null,
  },
});
