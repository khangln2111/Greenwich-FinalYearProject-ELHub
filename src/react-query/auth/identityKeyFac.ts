import { createQueryKeys } from "@lukemorales/query-key-factory";

export const identityKeyFac = createQueryKeys("identity", {
  currentUser: {
    queryKey: null,
  },
});
