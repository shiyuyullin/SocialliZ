import { createSlice } from "@reduxjs/toolkit";

export const errorState = createSlice({
  name: "errorMessage",
  initialState: {
    value: "No Error",
  },
  reducers: {
    setErrorContent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setErrorContent } = errorState.actions;

export default errorState.reducer;
