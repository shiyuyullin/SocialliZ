import { createSlice } from "@reduxjs/toolkit";

export const tokenState = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenState.actions;

export default tokenState.reducer;
