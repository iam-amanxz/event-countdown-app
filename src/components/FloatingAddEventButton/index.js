import React from "react";
import { Container } from "react-bootstrap";

import { useEvent } from "../../contexts/EventContext";

import "./float.css";

const FloatingAddButton = () => {
  const { setShowCreateModal } = useEvent();

  return (
    <Container className="floating-container">
      <div
        className="floating-add-button"
        onClick={() => setShowCreateModal(true)}
      >
        <box-icon name="plus" type="logo" size="md" color="white"></box-icon>
      </div>
    </Container>
  );
};

export default FloatingAddButton;
