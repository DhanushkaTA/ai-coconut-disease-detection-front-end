import type { ApiResponse, PostUser } from "../utils/Types";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllPosts: builder.query<{ data: PostTypes[]; totalPages?: number }, { page: number; limit: number; search: string }>({
    //   query: ({ page, limit, search }) => ({
    //     url: `/posts?page=${page}&limit=${limit}&search=${search}`,
    //     method: "GET",
    //   }),
    //   transformResponse: (response: ApiResponse<PostTypes[]>) => ({
    //     data: response.data,
    //     totalPages: response.totalPages,
    //   }),
    //   providesTags: ["Post"], 
    // }),

    // getPostById: builder.query<any, string>({
    //   query: (id) => `/posts/${id}`,
    //   providesTags: ["Post"],
    // }),
    getUsers: builder.query<
    //   { data: PostUser[]; totalPages?: number },
        ApiResponse<PostUser[]>,
      { page: number; limit: number; search: string; role?: string }
    >({
      query: ({ page, limit, search, role }) => ({
        url: `/users?page=${page}&limit=${limit}&search=${search}${role ? `&role=${role}` : ""}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;