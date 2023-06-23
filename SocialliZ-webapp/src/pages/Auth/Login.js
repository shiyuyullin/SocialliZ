import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";

const Login = ({ onLogin, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container textAlign="justified">
      <Form
        onSubmit={(event) =>
          onLogin(event, {
            email: email,
            password: password,
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
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
