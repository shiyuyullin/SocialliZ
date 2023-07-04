import { createSlice } from "@reduxjs/toolkit";

export const userIdState = createSlice({
  name: "userId",
  initialState: {
    value: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserId } = userIdState.actions;

export default userIdState.reducer;
