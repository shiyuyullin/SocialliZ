import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../States/authState";

export default configureStore({
  reducer: {
    isAuth: authReducer,
  },
});
