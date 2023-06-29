import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../States/authState";
import modalReducer from "../States/modalState";
import errorReducer from "../States/errorState";

export default configureStore({
  reducer: {
    authState: authReducer,
    modalState: modalReducer,
    errorState: errorReducer,
  },
});
