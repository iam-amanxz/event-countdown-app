import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "boxicons";

import ActivityPage from "../../pages/ActivityPage";
import SignUpPage from "../../pages/SignupPage";
import SignInPage from "../../pages/SigninPage";

import { AuthUserContext, withAuthentication } from "../../Session";

import * as ROUTES from "../../constants/routes";

const App = ({ authUser }) => {
  return (
    <Router>
      <AuthUserContext.Consumer>
        {(authUser) => (
          <Route
            exact
            path={ROUTES.ACTIVITY}
            render={(props) => (
              <ActivityPage {...props} currentUser={authUser} />
            )}
          />
        )}
      </AuthUserContext.Consumer>
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>
  );
};

export default withAuthentication(App);
