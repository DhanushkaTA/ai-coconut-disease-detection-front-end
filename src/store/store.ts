import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../service/apiSlice";
// import { apiSlice } from "../services/apiSlice";
import authReducer from "../service/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// // optional but recommended
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // localStorage

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Persist config
const persistConfig = {
  key: "auth",
  storage,
   whitelist: ["user", "isAuthenticated"],
};

// Wrap auth reducer
const persistedAuthReducer = persistReducer(
  persistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // ✅ IMPORTANT
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(apiSlice.middleware), // ✅ IMPORTANT
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;