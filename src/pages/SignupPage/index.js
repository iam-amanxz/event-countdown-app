import { useState, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import * as ROUTES from "../../constants/routes";

import "../LoginPage/login.css";

const SignupPage = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { signup, error, setError } = useApp();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then(() => {
          console.log(`User added success`);
          history.push("/");
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch {
      console.log("Error ocurred");
    }

    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {};

  return (
    <div className="login">
      <Container className="login-container p-3">
        <h1 className="login__title mb-5" style={{ textAlign: "center" }}>
          Register
        </h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form className="mb-3" onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={usernameRef}
              required
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              required
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              required
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
            Sign up
          </Button>
        </Form>
        <p className="mb-3" style={{ textAlign: "center" }}>
          OR
        </p>
        <Button
          block
          disabled={loading}
          variant="outline-danger"
          className="button"
          onClick={handleSignInWithGoogle}
        >
          Continue with Google
        </Button>
        <p className="mt-3" style={{ textAlign: "center" }}>
          Already have an account?&nbsp;
          <Link to={ROUTES.SIGN_IN}>
            <span style={{ color: "var(--clr-secondary)", fontWeight: "600" }}>
              Sign in
            </span>
          </Link>
        </p>
      </Container>
    </div>
  );
};

export default SignupPage;
