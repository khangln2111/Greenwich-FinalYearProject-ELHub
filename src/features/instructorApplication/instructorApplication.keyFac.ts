import { createQueryKeys } from "@lukemorales/query-key-factory";
import { InstructorApplicationQueryCriteria } from "./instructorApplication.types";

export const instructorApplicationKeyFac = createQueryKeys("instructorApplications", {
  getInstructorApplications: (query?: InstructorApplicationQueryCriteria) => ({
    queryKey: [query],
  }),
  getInstructorApplicationSelf: {
    queryKey: null,
  },
  getInstructorApplicationById: (id: string) => ({
    queryKey: [id],
  }),
});
