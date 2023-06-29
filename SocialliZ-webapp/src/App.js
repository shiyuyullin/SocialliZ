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
import { open, close } from "./util/States/modalState";
import { setErrorContent } from "./util/States/errorState";

const App = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authState.value);
  const dispatch = useDispatch();

  const [showMobileNav, setShowMobileNav] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

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
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMilliseconds);
  });

  const mobileNavHandler = (isOpen) => {
    setShowMobileNav(isOpen);
  };

  const logoutHandler = () => {
    dispatch(notAuthed());
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    const response = await axios
      .post(
        "/auth/login",
        {
          email: authData.email,
          password: authData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error);
        dispatch(notAuthed());
        setAuthLoading(false);
        // Checking if the user is authenticated successfully based on status code
        const statusCode = error.request.status;
        if (statusCode === 401) {
          dispatch(
            setErrorContent(
              "Login failed. Please check your username and password."
            )
          );
          dispatch(open());
        } else if (statusCode !== 200 && statusCode !== 201) {
          dispatch(setErrorContent("Could not authenticate you! "));
          dispatch(open());
        }
        return;
      });

    // By executing the following code, it is known that the user is authenticated
    if (response) {
      dispatch(authed());
      setUserId(response.data.userId);
      setToken(response.data.token);
      setAuthLoading(false);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    }
  };

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    const response = await axios
      .put(
        "/auth/signup",
        {
          email: authData.email,
          password: authData.password,
          name: authData.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error);
        dispatch(notAuthed());
        setAuthLoading(false);
      });
    console.log(response);
    // User creation failed
    if (response.status === 422) {
      dispatch(
        setErrorContent(
          "Signup failed. Make sure the email address isn't used yet!"
        )
      );
      dispatch(open());
    }
    if (response.status !== 200 && response.status !== 201) {
      dispatch(setErrorContent("Creating user failed."));
      dispatch(open());
    }
    // User created
    dispatch(notAuthed());
    setAuthLoading(false);
    navigate("/");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  let routes = (
    <Routes>
      <Route
        path="/"
        element={<LoginPage onLogin={loginHandler} loading={authLoading} />}
      />
      <Route
        path="/signup"
        element={<SignupPage onSignup={signupHandler} loading={authLoading} />}
      />
    </Routes>
  );

  if (authState && token) {
    routes = (
      <Routes>
        <Route path="/" element={<FeedPage userId={userId} token={token} />} />
        <Route
          path="/:postId"
          element={<SinglePostPage userId={userId} token={token} />}
        />
        <Route path="/user/:userId" element={<UserProfile token={token} />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <Modal />
      <Layout
        header={
          <MainNavigation
            onLogout={logoutHandler}
            isAuth={authState}
            userId={userId}
          />
        }
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
