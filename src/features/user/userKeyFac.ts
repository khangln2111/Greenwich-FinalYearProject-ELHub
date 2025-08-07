import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UserQueryCriteria } from "./user.types";

export const userKeyFac = createQueryKeys("users", {
  getUsers: (query?: UserQueryCriteria) => ({
    queryKey: [query],
  }),
});
