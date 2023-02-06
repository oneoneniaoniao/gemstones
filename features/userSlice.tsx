import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
import type { RootState } from "./store";

const initialState: UserState = {
  photoURL: "",
  displayName: "initialName",
  uid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { user: initialState },
  reducers: {
    storeUserInfo: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    initUserInfo: (state) => {
      state.user = initialState;
    },
  },
});

export const { storeUserInfo, initUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
