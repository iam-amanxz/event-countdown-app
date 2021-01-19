import React from "react";
import { Row } from "react-bootstrap";
import "./event.css";
import { useApp } from "../../contexts/AppContext";

const Event = ({ event }) => {
  const { currentEvent, setCurrentEvent } = useApp();

  return (
    <Row
      className={`event py-2 px-4 mb-2 ${
        currentEvent.eventId === event.eventId ? "event-active" : ""
      }`}
      onClick={() => {
        setCurrentEvent(event);
      }}
    >
      <p className="event__title">{event.eventTitle}</p>
    </Row>
  );
};

export default Event;
