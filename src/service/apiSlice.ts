import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
// baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Doctor", "Nurse", "Clinic", "Appointment", "Patient"],
  endpoints: () => ({}),
});
