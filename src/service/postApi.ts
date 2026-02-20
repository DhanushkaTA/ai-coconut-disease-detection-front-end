import type { ApiResponse, PostTypes } from "../utils/Types";
import { apiSlice } from "./apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<{ data: PostTypes[]; totalPages?: number }, { page: number; limit: number; search: string }>({
      query: ({ page, limit, search }) => ({
        url: `/posts?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PostTypes[]>) => ({
        data: response.data,
        totalPages: response.totalPages,
      }),
      providesTags: ["Post"], 
    }),

    getPostById: builder.query<any, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postApi;