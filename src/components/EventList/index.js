import { Col, Container } from "react-bootstrap";
import Event from "../Event";

export const EventList = ({ allEvents }) => {
  return (
    <Col xs={12} className="mt-3 event-list">
      <Container>
        {allEvents &&
          allEvents.map((event) => <Event event={event} key={event.eventId} />)}
      </Container>
    </Col>
  );
};
