import "boxicons";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ActivityPage from "../../pages/ActivityPage";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import PrivateRoute from "../PrivateRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* <PrivateRoute exact path="/" component={ActivityPage} /> */}
        <Route exact path="/" component={ActivityPage} />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} />
        <Route path={ROUTES.SIGN_UP} component={SignupPage} />
      </div>
    </Router>
  );
}

export default App;
