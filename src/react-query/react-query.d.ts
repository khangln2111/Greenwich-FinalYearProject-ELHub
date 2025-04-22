import "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/api"; // hoặc nơi bạn định nghĩa nó

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>;
  }
}
