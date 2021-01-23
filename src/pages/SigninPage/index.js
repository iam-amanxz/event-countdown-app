import React, { useState } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../constants/routes";

import "../auth.css";

const SignInPage = ({ firebase, history }) => {
  const INITIAL_STATE = {
    email: "",
    password: "",
    error: null,
    loading: false,
  };

  const [formValues, setFormValues] = useState(INITIAL_STATE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    setFormValues({
      ...formValues,
      loading: true,
      error: "",
    });

    try {
      firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Login success");
          history.push(ROUTES.ACTIVITY);
        })
        .catch((e) => {
          setFormValues({
            ...formValues,
            error: e.message,
          });
        });
    } catch (e) {
      setFormValues({
        ...formValues,
        error: e,
      });
    }

    setFormValues({
      ...formValues,
      loading: false,
    });
  };

  const handleGoogleSignIn = () => {
    setFormValues({
      ...formValues,
      loading: true,
      error: "",
    });

    try {
      firebase
        .doSignInWithGoogle()
        .then((result) => {
          const {
            user: { displayName, uid },
            additionalUserInfo: { isNewUser },
          } = result;
          if (isNewUser) {
            firebase
              .addUserToDb(displayName.split(" ")[0], uid)
              .then(() => {
                console.log(`User added success`);
                history.push(ROUTES.ACTIVITY);
              })
              .catch((e) => {
                setFormValues({
                  ...formValues,
                  error: e.message,
                });
              });
          } else {
            console.log("Login success");
            history.push(ROUTES.ACTIVITY);
          }
        })
        .catch((e) => {
          setFormValues({
            ...formValues,
            error: e,
          });
        });
    } catch (e) {
      setFormValues({
        ...formValues,
        error: e,
      });
    }

    setFormValues({
      ...formValues,
      loading: false,
    });
  };

  return (
    <div className="sign-in auth">
      <Container className="d-flex justify-content-center h-100 align-items-center">
        <Card className="auth-card">
          <Card.Body className="p-md-5">
            <Card.Title className="auth-title mb-4 text-center">
              Sign In
            </Card.Title>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={formValues.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                  value={formValues.password}
                />
              </Form.Group>

              <Button
                type="submit"
                disabled={formValues.loading}
                variant="light"
                className="font-weight-bold text-uppercase"
                block
              >
                Sign In
              </Button>
            </Form>

            <Card.Text className="text-center my-3">OR</Card.Text>

            <Button
              disabled={formValues.loading}
              onClick={handleGoogleSignIn}
              variant="outline-light "
              className="font-weight-bold text-uppercase"
              block
            >
              Continue with Google
            </Button>

            <Card.Text className="text-center mt-3">
              Don't have an account? <Link to={ROUTES.SIGN_UP}>Register</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default compose(withRouter, withFirebase)(SignInPage);
