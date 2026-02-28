import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any[], void>({
      query: () => "/chat",
      providesTags: ["Chat"],
    }),

    markAsRead: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useMarkAsReadMutation,
} = chatApi;