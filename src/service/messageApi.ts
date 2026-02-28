import { apiSlice } from "./apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<any[], string>({
      query: (chatId) => `/chats/${chatId}/messages`,
      transformResponse: (response: any) => response.data,
      providesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messageApi;