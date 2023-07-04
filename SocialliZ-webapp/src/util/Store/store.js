import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../States/authState";
import modalReducer from "../States/modalState";
import errorReducer from "../States/errorState";
import authLoadingReducer from "../States/authLoadingState";
import userIdReducer from "../States/userIdState";
import tokenReducer from "../States/tokenState";
import userReducer from "../States/userState";

export default configureStore({
  reducer: {
    authState: authReducer,
    modalState: modalReducer,
    errorState: errorReducer,
    authLoadingState: authLoadingReducer,
    userIdState: userIdReducer,
    tokenState: tokenReducer,
    userState: userReducer,
  },
});
