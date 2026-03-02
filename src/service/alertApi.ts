import type { AlertTypes, ApiResponse, NotificationTypes, PostCommentResponse } from "../utils/Types";
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

    getTodayAlerts: builder.query<{ data: NotificationTypes[]; totalPages?: number }, void>({
      query: () => ({
        url: "/alerts/today",
        method: "GET",
        transformResponse: (response: ApiResponse<NotificationTypes[]>) => 
        response.data,
        invalidatesTags: ["Alert"], 
      }),
    }),

    toggleLike: builder.mutation<{ likesCount: number }, string>({
      query: (id) => ({
        url: `/alerts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Alert"],
    }),

    getAlertById: builder.query<AlertTypes, { id: string }>({
    query: ({ id }) => ({
      url: `/alerts/${id}`,
      method: "GET",
    }),
    transformResponse: (response: ApiResponse<AlertTypes>) =>
      response.data,
    providesTags: ["Alert"],
  }),

    getCommentsById: builder.query<PostCommentResponse , {id: string, page: number}>({
      query: ({ id, page }) =>({
        url: `/alert-comments/${id}?page=${page}&limit=10`,
        method: "GET",
        transformResponse: (response: ApiResponse<PostCommentResponse>) => response.data,
        invalidatesTags: ["AComment"],
      }),
      // providesTags: (result, error, arg) => [
      //   { type: "AComment", id: arg.id }
      // ],
    }),

    addComment: builder.mutation({
      query: ({ id, content }) => ({
        url: `/alert-comments/${id}`,
        method: "POST",
        body: { content },
        invalidatesTags: ["AComment"],
        // invalidatesTags: (result, error, arg) => [
        //   { type: "AComment", id: arg.id }
        // ]
      }),
    }),
  }),
});

export const { 
  useGetAllAlertsQuery, 
  useCreateAlertMutation, 
  useUpdateAlertMutation, 
  useDeleteAlertMutation, 
  useToggleLikeMutation,
  useGetTodayAlertsQuery,
  useGetAlertByIdQuery,
  useGetCommentsByIdQuery,
  useAddCommentMutation
 } = alertsApi;