import { isAxiosError } from "axios";
import type { ApiResponse } from "../api/types";
import { MESSAGES } from "../constants/messages";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiResponse>(error)) {
    return error.response?.data?.message ?? MESSAGES.common.errorGeneric;
  }

  return MESSAGES.common.errorGeneric;
}
