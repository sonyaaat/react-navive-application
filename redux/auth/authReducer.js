import { createSlice } from "@reduxjs/toolkit";

const prevstate={ userId: null,
    nickname: null,
    stateChange: false,}
export const authSlice = createSlice({
  name: "auth",
  initialState: prevstate,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname:payload.nickname
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut:()=>prevstate,
  },
});
