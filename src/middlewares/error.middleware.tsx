import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { toast } from "sonner";

import i18n from "@/i18n/i18n";
import { setAppAuth } from "@/store";
import type { ApiErrorPayload } from "@/types/shared";

function isApiErrorPayload(payload: unknown): payload is ApiErrorPayload {
  return typeof payload === "object" && payload !== null && "status" in payload && "data" in payload;
}

export const errorMiddleware: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload;

      if (isApiErrorPayload(payload)) {
        if (payload.status === 401) {
          localStorage.removeItem("access-token");
          dispatch(setAppAuth(false));
        }

        const error = payload.data;

        toast.error(i18n.t(`code.${error.code}`));
      }
    }

    return next(action);
  };
