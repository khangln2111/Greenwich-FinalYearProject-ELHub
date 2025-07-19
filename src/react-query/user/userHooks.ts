import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { getUsers } from "./userApi";
import { UserQueryCriteria } from "./user.types";

export const useGetUsers = (query?: UserQueryCriteria) => {
  return useQuery({
    queryKey: keyFac.users.getUsers(query).queryKey,
    queryFn: () => getUsers(),
  });
};
