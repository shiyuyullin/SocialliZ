import { createSlice } from "@reduxjs/toolkit";

export const authState = createSlice({
  name: "isAuth",
  initialState: {
    value: false,
  },
  reducers: {
    authed: (state) => {
      state.value = true;
    },
    notAuthed: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authed, notAuthed } = authState.actions;

export default authState.reducer;
