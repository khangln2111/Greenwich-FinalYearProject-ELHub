import { useQuery } from "@tanstack/react-query";
import { keyFac } from "../common-service/queryKeyFactory";
import { getEnrollmentsSelf } from "./enrollmentApi";
import { useAppStore } from "../../zustand/store";

export const useGetEnrollmentsSelf = () => {
  const currentUser = useAppStore.use.currentUser();

  return useQuery({
    queryKey: keyFac.enrollments.getEnrollmentsSelf().queryKey,
    queryFn: getEnrollmentsSelf,
    enabled: !!currentUser,
  });
};
