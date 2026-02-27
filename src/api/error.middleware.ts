import { setAppAuth } from "@/store";
import type { ApiErrorPayload } from "@/types/shared";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
// import { toast } from "sonner";

export const errorMiddleware: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      // const errorMessage = (action.payload as ApiErrorPayload).data?.message;
      const errorStatus = (action.payload as ApiErrorPayload).status;

      if (errorStatus === 401) {
        localStorage.removeItem("access-token");
        dispatch(setAppAuth(false));
      } else {
        // toast.error("API Error", {
        //   description: errorMessage,
        //   classNames: {
        //     toast: "items-start!",
        //   },
        //   closeButton: true,
        // });
      }
    }

    return next(action);
  };
