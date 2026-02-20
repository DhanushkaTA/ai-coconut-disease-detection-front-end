import type { ApiResponse, NotificationTypes } from "../utils/Types";
import { apiSlice } from "./apiSlice";

export const alertsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlerts: builder.query<{ data: NotificationTypes[]; totalPages?: number }, { page: number; limit: number; search: string }>({
      query: ({ page, limit, search }) => ({
        url: `/alerts?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<NotificationTypes[]>) => ({
        data: response.data,
        totalPages: response.totalPages,
      }),
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
    updateAlert: builder.mutation<
      NotificationTypes,
      { id: string; body: { title: string; description: string; image: string } }
    >({
      query: ({ id, body }) => ({
        url: `/alerts/${id}`,
        method: "PUT", 
        body,
      }),
      transformResponse: (response: ApiResponse<NotificationTypes>) =>
        response.data,
      invalidatesTags: ["Alert"],
    }),
    deleteAlert: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/alerts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Alert"], 
    }),
  }),
});

export const { useGetAllAlertsQuery, useCreateAlertMutation, useUpdateAlertMutation, useDeleteAlertMutation } = alertsApi;