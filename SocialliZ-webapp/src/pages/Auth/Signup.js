import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import WelcomeBoard from "../../components/WelcomeDisplay/WelcomeBoard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { open, close } from "../../util/States/modalState";
import { setErrorContent } from "../../util/States/errorState";
import { authed, notAuthed } from "../../util/States/authState";
import {
  authLoading,
  notAuthLoading,
} from "../../util/States/authLoadingState";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.authLoadingState.value);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    dispatch(notAuthLoading());
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
        dispatch(notAuthLoading());
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
    dispatch(notAuthLoading());
    navigate("/");
  };

  return (
    <Container textAlign="justified">
      <WelcomeBoard />
      <Form
        onSubmit={(event) =>
          signupHandler(event, {
            email: email,
            password: password,
            username: username,
          })
        }
      >
        <Form.Field fluid="true">
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="email@email.com"
            onChange={handleEmailChange}
          />
        </Form.Field>
        <Form.Field fluid="true">
          <label>Username</label>
          <input
            name="username"
            type="text"
            required
            placeholder="socialliZer.."
            onChange={handleUsernameChange}
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
          />
        </Form.Field>
        <Button type="submit" loading={loading}>
          Signup!
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
