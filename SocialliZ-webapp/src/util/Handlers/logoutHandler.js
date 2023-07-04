import { authed, notAuthed } from "../States/authState";
import { setToken } from "../States/tokenState";
import { routerNavigate } from "../Helpers/routerNavigate";
import store from "../Store/store";

const logoutHandler = () => {
  store.dispatch(notAuthed());
  store.dispatch(setToken(null));
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
  routerNavigate.navigate("/");
};

const setAutoLogout = (milliseconds) => {
  setTimeout(() => {
    logoutHandler();
  }, milliseconds);
};

export { logoutHandler, setAutoLogout };
