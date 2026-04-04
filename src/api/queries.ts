import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { setAppMemoryToken } from '@/store/app/app.slice';
import type { RootState } from '@/store/types';

const rawBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).app.inMemoryToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  });

export const makeBaseQueryWithReauth = (baseUrl: string): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => async (args, api, extraOptions) => {
  const query = rawBaseQuery(baseUrl);
  let result = await query(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshQuery = rawBaseQuery(`${import.meta.env.VITE_API_URL}/api`);
    const refreshResult = await refreshQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { access } = refreshResult.data as { access: string };
      api.dispatch(setAppMemoryToken(access));
      result = await query(args, api, extraOptions);
    } else {
      api.dispatch(setAppMemoryToken(null));
      // можно диспатчнуть редирект на логин
    }
  }

  return result;
};