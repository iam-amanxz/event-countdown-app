import React, { useState } from "react";
import { Card, Container, Button, Form, Alert, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../constants/routes";

import "../auth.css";

const SignUpPage = ({ firebase, history }) => {
  const INITIAL_STATE = {
    username: "",
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
    const { username, email, password } = formValues;
    e.preventDefault();

    setFormValues({
      ...formValues,
      loading: true,
      error: "",
    });

    try {
      firebase
        .doCreateUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          console.log(`Signup Success with: ${authUser.user.uid}`);
          setFormValues(INITIAL_STATE);

          firebase
            .addUserToDb(username, authUser.user.uid)
            .then(() => {
              console.log(`User added success`);
              history.push(ROUTES.ACTIVITY);
            })
            .catch((e) => {
              const user = firebase.auth.currentUser;
              user
                .delete()
                .then(() => {
                  console.log(`User deleted because of database problems`);
                })
                .catch((e) => {
                  setFormValues({
                    ...formValues,
                    error: e.message,
                  });
                });

              setFormValues({
                ...formValues,
                error: e.message,
              });
            });
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

  return (
    <div className="sign-in auth">
      <Container className="d-flex justify-content-center h-100 align-items-center">
        <Card className="auth-card">
          <Card.Body className="p-md-5">
            <Card.Title className="auth-title mb-4 text-center">
              Sign Up
            </Card.Title>
            {formValues.error && (
              <Alert variant="danger">{formValues.error}</Alert>
            )}
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Username"
                  name="username"
                  onChange={handleInputChange}
                  value={formValues.username}
                />
              </Form.Group>

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

              {formValues.loading && (
                <div style={{ textAlign: "center" }}>
                  <Spinner
                    animation="border"
                    variant="light"
                    className="mb-3"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={formValues.loading}
                variant="light"
                className="font-weight-bold text-uppercase"
                block
              >
                Sign Up
              </Button>
            </Form>

            <Card.Text className="text-center mt-3">
              Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default compose(withRouter, withFirebase)(SignUpPage);
