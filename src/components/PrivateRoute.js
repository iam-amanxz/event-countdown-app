import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import * as ROUTES from "../constants/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useApp();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.SIGN_IN} />
        );
      }}
    ></Route>
  );
}
