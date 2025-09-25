import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InstructorApplicationQueryCriteria } from "./instructorApplication.types";
import {
  getInstructorApplicationById,
  getInstructorApplications,
  getInstructorApplicationSelf,
  getRetryInfoSelf,
} from "./instructorApplication.api";

export const instructorApplicationKeyFac = createQueryKeys("instructorApplications", {
  getInstructorApplications: (query?: InstructorApplicationQueryCriteria) => ({
    queryKey: [query],
    queryFn: () => getInstructorApplications(query),
  }),
  getInstructorApplicationSelf: {
    queryKey: null,
    queryFn: () => getInstructorApplicationSelf(),
  },
  getInstructorApplicationById: (id: string) => ({
    queryKey: [id],
    queryFn: () => getInstructorApplicationById(id),
  }),
  getRetryInfoSelf: {
    queryKey: null,
    queryFn: () => getRetryInfoSelf(),
  },
});
