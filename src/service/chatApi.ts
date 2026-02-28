import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any[], void>({
      query: () => "/chats",
      transformResponse: (response: any) => response.data,
      providesTags: ["Chat"],
    }),

    markAsRead: builder.mutation({
      query: (chatId) => ({
        url: `/chats/${chatId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chat"],
    }),

    createChat: builder.mutation({
      query: (receiverId: string) => ({
        url: "/chats",
        method: "POST",
        body: { receiverId },
      }),
      transformResponse: (response: any) => response.data,

      // async onQueryStarted(receiverId, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data: newChat } = await queryFulfilled;

      //     // 🔥 Update chat list cache immediately
      //     dispatch(
      //       chatApi.util.updateQueryData(
      //         "getChats",
      //         undefined,
      //         (draft: any[]) => {

      //           const exists = draft.find(
      //             (chat) => chat._id === newChat._id
      //           );

      //           if (!exists) {
      //             draft.unshift(newChat);
      //           }
      //         }
      //       )
      //     );
      //   } catch (err) {
      //     console.error("Create chat failed", err);
      //   }
      // },

      invalidatesTags: ["Chat"], // optional
    }),
  }),
});

export const {
  useGetChatsQuery,
  useMarkAsReadMutation,
  useCreateChatMutation,
} = chatApi;