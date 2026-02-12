import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../service/apiSlice";
// import { apiSlice } from "../services/apiSlice";
import authReducer from "../service/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional but recommended
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
