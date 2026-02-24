import type { ApiErrorPayload } from "@/types/shared";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = (action.payload as ApiErrorPayload).data?.message;
    toast.error("API Error", {
      description: errorMessage,
      classNames: {
        toast: "items-start",
      },
      closeButton: true,
    });
  }

  return next(action);
};
