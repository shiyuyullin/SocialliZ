import { createSlice } from "@reduxjs/toolkit";

export const userState = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "",
      email: "",
      status: "",
    },
  },
  reducers: {
    setUserName: (state, action) => {
      state.value.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.value.email = action.payload;
    },
    setUserStatus: (state, action) => {
      state.value.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setUserEmail, setUserStatus } = userState.actions;

export default userState.reducer;
