import { createSlice } from "@reduxjs/toolkit";

export const authLoadingState = createSlice({
  name: "authLoading",
  initialState: {
    value: false,
  },
  reducers: {
    authLoading: (state) => {
      state.value = true;
    },
    notAuthLoading: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authLoading, notAuthLoading } = authLoadingState.actions;

export default authLoadingState.reducer;
