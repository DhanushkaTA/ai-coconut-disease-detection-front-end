import { createSlice } from "@reduxjs/toolkit";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: true,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { logout } = authSlice.actions; 
export default authSlice.reducer;
