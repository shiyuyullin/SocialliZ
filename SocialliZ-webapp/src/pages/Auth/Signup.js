import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";

const Signup = ({ onSignup, loading }) => {
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

  return (
    <Container textAlign="justified">
      <Form
        onSubmit={(event) =>
          onSignup(event, {
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
