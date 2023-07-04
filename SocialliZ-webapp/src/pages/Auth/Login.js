import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import WelcomeBoard from "../../components/WelcomeDisplay/WelcomeBoard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authed, notAuthed } from "../../util/States/authState";
import { open, close } from "../../util/States/modalState";
import { setErrorContent } from "../../util/States/errorState";
import {
  authLoading,
  notAuthLoading,
} from "../../util/States/authLoadingState";
import { setUserId } from "../../util/States/userIdState";
import { setToken } from "../../util/States/tokenState";
import { setAutoLogout } from "../../util/Handlers/logoutHandler";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authLoadingState.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    dispatch(authLoading());
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
        dispatch(notAuthLoading());
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
      dispatch(setUserId(response.data.userId));
      dispatch(setToken(response.data.token));
      dispatch(notAuthLoading());
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    }
  };

  return (
    <Container textAlign="justified">
      <WelcomeBoard />
      <Form
        onSubmit={(event) => {
          loginHandler(event, {
            email: email,
            password: password,
          });
          clearForm();
        }}
      >
        <Form.Field fluid="true">
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="email@email.com"
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Field>
        <Form.Field fluid="true">
          <label>Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </Form.Field>
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
