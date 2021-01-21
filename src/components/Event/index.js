import React from "react";
import { Row } from "react-bootstrap";
import "./event.css";
import { useApp } from "../../contexts/AppContext";

const Event = ({ event }) => {
  const { currentEvent, setCurrentEvent } = useApp();

  return (
    <Row
      className={`event py-2 px-4 mb-2 ${
        currentEvent.id === event.id ? "event-active" : ""
      }`}
      onClick={() => {
        setCurrentEvent(event);
      }}
    >
      <p className="event__title">{event.title}</p>
    </Row>
  );
};

export default Event;
