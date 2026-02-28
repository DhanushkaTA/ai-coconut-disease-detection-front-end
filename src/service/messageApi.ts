import { apiSlice } from "./apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<any[], string>({
      query: (chatId) => `/chat/${chatId}/messages`,
      providesTags: ["Message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messageApi;