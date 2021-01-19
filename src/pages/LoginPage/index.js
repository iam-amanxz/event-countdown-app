import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import * as ROUTES from "../../constants/routes";

import "./login.css";

const LoginPage = () => {
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };
  const { login, error, setError } = useApp();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formValues.email, formValues.password)
        .then(() => {
          console.log("Login success");
          history.push("/");
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch {
      console.log("Error ocurred");
    }
    setLoading(false);
    setFormValues(INITIAL_VALUES);
  };

  const handleSignInWithGoogle = async () => {};

  return (
    <div className="login">
      <Container className="login-container p-3">
        <h1 className="login__title mb-5" style={{ textAlign: "center" }}>
          Sign In
        </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form className="mb-3" onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              required
              value={formValues.password}
              onChange={handleInputChange}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Button
            disabled={loading}
            block
            type="submit"
            variant="danger"
            className="button"
          >
            Login
          </Button>
        </Form>
        <p className="mb-3" style={{ textAlign: "center" }}>
          OR
        </p>
        <Button
          disabled={loading}
          block
          variant="outline-danger"
          className="button"
          onClick={handleSignInWithGoogle}
        >
          Continue with Google
        </Button>
        <p className="mt-3" style={{ textAlign: "center" }}>
          Don’t have an account?&nbsp;
          <Link to={ROUTES.SIGN_UP}>
            <span style={{ color: "var(--clr-secondary)", fontWeight: "600" }}>
              Register
            </span>
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default LoginPage;
