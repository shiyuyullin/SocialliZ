import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout/Layout";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import "./App.css";
import UserProfile from "./pages/User/UserProfile";
import Modal from "./components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { authed, notAuthed } from "./util/States/authState";
import { setUserId } from "./util/States/userIdState";
import { setToken } from "./util/States/tokenState";
import { routerNavigate } from "./util/Helpers/routerNavigate";
import { logoutHandler, setAutoLogout } from "./util/Handlers/logoutHandler";

const App = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  routerNavigate.navigate = useNavigate();
  const authState = useSelector((state) => state.authState.value);
  const userIdState = useSelector((state) => state.userIdState.value);
  const tokenState = useSelector((state) => state.tokenState.value);
  const dispatch = useDispatch();
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(authed());
    dispatch(setToken(token));
    dispatch(setUserId(userId));
    setAutoLogout(remainingMilliseconds);
  });

  const mobileNavHandler = (isOpen) => {
    setShowMobileNav(isOpen);
  };

  let routes = (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );

  if (authState && tokenState) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={<FeedPage userId={userIdState} token={tokenState} />}
        />
        <Route
          path="/:postId"
          element={<SinglePostPage userId={userIdState} token={tokenState} />}
        />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <Modal />
      <Layout
        header={<MainNavigation />}
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={mobileNavHandler.bind(this, false)}
            onLogout={logoutHandler}
            isAuth={authState}
          />
        }
      />
      {routes}
    </Fragment>
  );
};

export default App;
