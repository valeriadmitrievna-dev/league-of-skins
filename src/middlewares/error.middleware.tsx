import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { Trans } from "react-i18next";
import { toast } from "sonner";

import { Typography } from "@/components/Typography";
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

        const entity = i18n.t(`entities.${error.entity}`);
        toast.error(<Trans i18nKey={`code.${error.code}`} tOptions={{ entity }} components={{ code: <Typography.Code /> }} />, {
          ...(error.params?.length || error.entity
            ? {
                description: (
                  <div className="flex flex-col gap-y-3 mt-1">
                    {error.params?.length && (
                      <p>
                        {i18n.t("titles.params") as string}
                        {error.params.map((param) => (
                          <Typography.Code className="text-[12px]/[12px]">{param}</Typography.Code>
                        ))}
                      </p>
                    )}
                    {error.entity && (
                      <p>
                        {i18n.t("titles.entity") as string}
                        <Typography.Code className="text-[12px]/[12px]">{entity as string}</Typography.Code>
                      </p>
                    )}
                  </div>
                ),
              }
            : {}),
        });
      }
    }

    return next(action);
  };
