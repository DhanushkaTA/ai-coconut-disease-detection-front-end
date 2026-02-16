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

    createAlert: builder.mutation<
      NotificationTypes,
      { title: string; description: string; image: string }
    >({
      query: (body) => ({
        url: "/alerts",
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<NotificationTypes>) =>
        response.data,
      invalidatesTags: ["Alert"], 
    }),
  }),
});

export const { useGetAllAlertsQuery, useCreateAlertMutation} = alertsApi;