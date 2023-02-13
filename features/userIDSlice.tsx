import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/features/store";

export const userIdSlice = createSlice({
  name: "userID",
  initialState: { userID: "" },
  reducers: {
    storeLoginUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    deleteLoginUserID: (state) => {
      state.userID = "";
    },
  },
});

export const { storeLoginUserID, deleteLoginUserID } = userIdSlice.actions;
export const selectLoginUserID = (state: RootState) => state.userID.userID;
