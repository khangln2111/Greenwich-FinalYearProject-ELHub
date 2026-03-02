import { createQueryKeys } from "@lukemorales/query-key-factory";
import { UserQueryCriteria } from "./user.types";
import { getUsers } from "./user.api";

export const userKeyFac = createQueryKeys("users", {
  getUsers: (query?: UserQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getUsers(query),
  }),
});
