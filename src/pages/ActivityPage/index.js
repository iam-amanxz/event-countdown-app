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
  const { getAllEvents, setAllEvents, currentUser, setCurrentEvent } = useApp();

  const fetchAllEvents = async () => {
    try {
      let events = [];
      await getAllEvents()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            events.push({ eventId: doc.id, ...doc.data() });
          });
        })
        .catch((e) => {
          console.log(e.message);
        });
      setAllEvents(events);
      setCurrentEvent(events[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, [currentUser]);

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
