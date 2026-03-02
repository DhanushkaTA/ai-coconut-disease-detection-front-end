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

    getPostsByUser: builder.query<{ data: PostTypes[]; totalPages?: number }, { page: number; limit: number; search: string }>({
      query: ({ page, limit, search }) => ({
        url: `/posts/user?page=${page}&limit=${limit}&search=${search}`,
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
    // new one for comments
    getPostCommentsPagi: builder.query<
      { comments: any[]; totalPages: number },
      { postId: string; page: number }
    >({
      query: ({ postId, page }) => ({
        url: `/post-comments/${postId}?page=${page}&limit=10`,
        method: "GET",
        providesTags: ["Post"],
      }),
    }),

    createPost: builder.mutation<
          PostTypes,
          { content: string; image: string }
        >({
          query: (body) => ({
            url: "/posts",
            method: "POST",
            body,
          }),
          transformResponse: (response: ApiResponse<PostTypes>) =>
            response.data,
          invalidatesTags: ["Post"], 
        }),

    createPostComment: builder.mutation<
      any,
      { postId: string; content: string; parentCommentId?: string | null }
    >({
      query: ({ postId, content, parentCommentId }) => ({
        url: `/post-comments/${postId}`,
        method: "POST",
        body: {
          content,
          parentCommentId: parentCommentId || null,
        },
      }),
      invalidatesTags: ["Post"], // refetch comments after create
    }),

    updatePost: builder.mutation<
          PostTypes,
          { id: string, content: string; image: string }
        >({
          query: (body) => ({
            url: `/posts/`,
            method: "PUT", 
            body,
          }),
          transformResponse: (response: ApiResponse<PostTypes>) =>
            response.data,
          invalidatesTags: ["Post"],
        }),
  }),
});

export const { 
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetPostCommentsPagiQuery, 
  useCreatePostCommentMutation, 
  useCreatePostMutation,
  useGetPostsByUserQuery,
  useUpdatePostMutation
 } = postApi;