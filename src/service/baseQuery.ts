import {
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
// import { logout } from "./authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5500/api/v1",
  credentials: "include",
});

export const baseQueryWithAuth: BaseQueryFn<
  string | { url: string; method?: string; body?: any },
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    console.log("Case ekak log out karann ona");
    
    // api.dispatch(logout());
  }

  return result;
};
