import { createSlice } from "@reduxjs/toolkit";

export const modalState = createSlice({
  name: "shouldModalOpen",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
  },
});

export const { open, close } = modalState.actions;

export default modalState.reducer;
