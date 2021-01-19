import { Col, Row, Button } from "react-bootstrap";
import { EventList } from "../EventList";
import Header from "../Header";
import "./sidebar.css";

import { db } from "../../firebase";

import { useApp } from "../../contexts/AppContext";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { setShowCreateModal, setEditMode, allEvents } = useApp();

  const handleAddEventButtonClick = () => {
    setEditMode(false);
    setShowCreateModal(true);
  };

  return (
    <Col md={4} className="d-md-block d-sm-none sidebar">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col>
          <Button
            className="sidebar__add-btn"
            block
            onClick={handleAddEventButtonClick}
          >
            Add New Event
          </Button>
        </Col>
      </Row>
      <Row>
        <EventList allEvents={allEvents} />
      </Row>
      <Row></Row>
    </Col>
  );
};

export default Sidebar;
