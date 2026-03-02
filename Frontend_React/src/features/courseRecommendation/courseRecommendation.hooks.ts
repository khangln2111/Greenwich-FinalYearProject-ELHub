import { useMutation } from "@tanstack/react-query";
import { createChatSession } from "./courseRecommendation.api";

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: createChatSession,
  });
};
