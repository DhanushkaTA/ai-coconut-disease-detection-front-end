import { apiSlice } from "./apiSlice";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
