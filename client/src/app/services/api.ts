import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, api) => {
    const { getState } = api;
    const storeToken = (getState() as RootState).auth.user?.token;
    const userToken = storeToken ?? localStorage.getItem(LS_USER_TOKEN);
    if (userToken) {
      headers.set('authorization', `Bearer ${userToken}`)
    }
    return headers;
  }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})