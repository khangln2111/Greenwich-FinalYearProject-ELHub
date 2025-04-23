import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getCurrentUser } from "./identityApi";

export const identityKeyFac = createQueryKeys("identity", {
  currentUser: {
    queryKey: null,
    queryFn: getCurrentUser,
  },
});
