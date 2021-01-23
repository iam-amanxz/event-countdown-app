import React from "react";
import { Navbar, Container, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import moment from "moment";
import { withFirebase } from "../../Firebase";

import * as ROUTES from "../../constants/routes";

import "./header.css";

const Header = ({
  firebase,
  history,
  currentUser,
  setShowAvatarUploadModal,
}) => {
  const handleLogOut = () => {
    firebase
      .doSignOut()
      .then(() => {
        console.log("Sign out success");
        history.push(ROUTES.SIGN_IN);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <Navbar className="header">
      <Container>
        <div className="header__profile">
          <Image
            className="profile-avatar mr-3"
            src={currentUser.avatarUrl}
            roundedCircle
            onClick={() => setShowAvatarUploadModal(true)}
          />
          <div>
            <h5 className="m-0">Hello, {currentUser.username}</h5>
            <p className="m-0"> {moment().format("Do MMM [,] YYYY")}</p>
          </div>
        </div>
        <div className="logout-btn" onClick={handleLogOut}>
          <box-icon name="power-off"></box-icon>
        </div>
      </Container>
    </Navbar>
  );
};

export default compose(withRouter, withFirebase)(Header);
