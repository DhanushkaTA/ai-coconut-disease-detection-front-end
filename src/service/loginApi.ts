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

type RegisterRequest = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  profilePic: string;
};

type RegisterResponse = {
  status: number;
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
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

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
