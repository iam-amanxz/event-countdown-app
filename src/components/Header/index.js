import React from "react";
import { Col, Row } from "react-bootstrap";

import { useApp } from "../../contexts/AppContext";
import moment from "moment";

import "./header.css";

const Header = () => {
  const { currentUser, logout } = useApp();

  return (
    <Col xs={12} className="header my-4">
      <Row>
        <Col xs={9} className="header__profile">
          {/* <div
            className="header__profile-picture mr-2"
            style={{ backgroundImage: `url(${currentUser.photoUrl})` }}
          ></div> */}
          <div className="header__profile-info">
            {/* <span className="profile-info__username">
              Hello, {currentUser.username}
            </span> */}
            <span className="profile-info__date">
              {moment().format("Do MMM [,] YYYY")}
            </span>
          </div>
        </Col>
        <Col xs={3} className="header__settings">
          <box-icon
            name="dots-horizontal-rounded"
            size="md"
            onClick={async () => logout()}
          ></box-icon>
        </Col>
      </Row>
    </Col>
  );
};

export default Header;
