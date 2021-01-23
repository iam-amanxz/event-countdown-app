import React from "react";

import { useEvent } from "../../contexts/EventContext";

const Event = ({ event }) => {
  const { setCurrentEvent, currentEvent } = useEvent();

  return (
    <div
      className={`event-item ${
        currentEvent && currentEvent.id === event.id ? "active" : ""
      }`}
      onClick={() => setCurrentEvent(event)}
    >
      {event.title}
    </div>
  );
};

export default Event;
