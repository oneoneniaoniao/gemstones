import { configureStore } from "@reduxjs/toolkit";
import { userIdSlice } from "@/features/userIDSlice";

export const store = configureStore({
  reducer: {
    userID: userIdSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
