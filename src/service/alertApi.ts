import type { ApiResponse, NotificationTypes } from "../utils/Types";
import { apiSlice } from "./apiSlice";

export const alertsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlerts: builder.query<NotificationTypes[], void>({
      query: () => ({
        url: "/alerts",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<NotificationTypes[]>) =>
        response.data,
      providesTags: ["Alert"], 
    }),
  }),
});

export const { useGetAllAlertsQuery} = alertsApi;