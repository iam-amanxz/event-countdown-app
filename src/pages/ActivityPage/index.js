import { Container, Row } from "react-bootstrap";
import { ActivityScreen } from "../../components/ActivityScreen";
import { EventList } from "../../components/EventList";
// import { FloatingAddEventButton } from "../../components/FloatingAddEventButton";
import Header from "../../components/Header";
import EventCreationModal from "../../components/Modals/EventCreationModal";
import Sidebar from "../../components/Sidebar";
import { useApp } from "../../contexts/AppContext";
import { useEffect } from "react";

const ActivityPage = () => {
  const { fetchAllEvents } = useApp();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="activity">
      <Container className="d-md-none">
        <Row>
          <Header />
        </Row>
      </Container>
      <Container className="activity__medium ">
        <Row>
          <ActivityScreen />
          <Sidebar />
        </Row>
      </Container>
      <Container className="d-md-none">
        <Row>
          <EventList />
        </Row>
      </Container>
      <Container>
        <EventCreationModal />
      </Container>
      {/* <FloatingAddEventButton /> */}
    </div>
  );
};

export default ActivityPage;
