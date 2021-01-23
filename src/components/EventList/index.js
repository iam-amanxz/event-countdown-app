import React from "react";
import { Container } from "react-bootstrap";

import "../Event/event.css";
import Event from "../Event";

import { useEvent } from "../../contexts/EventContext";

const EventList = () => {
  const { allEvents } = useEvent();

  return (
    <Container
      style={{ display: "grid", placeItems: "center" }}
      className="px-0 event-list-container"
    >
      <div className="event-list px-2">
        {allEvents.map((event) => (
          <Event event={event} key={event.id} />
        ))}
      </div>
    </Container>
  );
};

export default EventList;
