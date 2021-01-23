import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { Container, Spinner } from "react-bootstrap";

import ActivityScreen from "../../components/ActivityScreen";
import EventList from "../../components/EventList";
import FloatingAddButton from "../../components/FloatingAddEventButton";
import Header from "../../components/Header";
import EventCreationModal from "../../components/Modals/EventCreationModal";
import EventEditModal from "../../components/Modals/EventEditModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";

import { withFirebase } from "../../Firebase";
import { withAuthorization } from "../../Session";
import { useEvent } from "../../contexts/EventContext";
import AvatarUploadModal from "../../components/Modals/AvatarUploadModal";

const ActivityPage = ({ currentUser, firebase }) => {
  const {
    loading,
    setLoading,
    allEvents,
    setAllEvents,
    setCurrentEvent,
    currentEvent,
    setShowCreateModal,
  } = useEvent();

  const [showAvatarUploadModal, setShowAvatarUploadModal] = useState(false);

  let unsubscribe;

  useEffect(() => {
    fetchAllEvents();

    return unsubscribe;
  }, []);

  const fetchAllEvents = () => {
    setLoading(true);
    unsubscribe = firebase
      .getAllEvents(currentUser.id)
      .then((querySnapshot) => {
        let eventsFetched = [];
        querySnapshot.forEach((doc) => {
          eventsFetched.push({ id: doc.id, ...doc.data() });
        });
        setAllEvents(eventsFetched);
        setCurrentEvent(eventsFetched[0]);
        setLoading(false);
      });
  };

  return (
    <div className="activity">
      <Header
        showAvatarUploadModal={showAvatarUploadModal}
        currentUser={currentUser}
        setShowAvatarUploadModal={setShowAvatarUploadModal}
      />
      <AvatarUploadModal
        currentUser={currentUser}
        showAvatarUploadModal={showAvatarUploadModal}
        setShowAvatarUploadModal={setShowAvatarUploadModal}
      />

      {loading && (
        <Container className="loading-container">
          <Spinner animation="border" variant="light" className="mb-3" />
        </Container>
      )}

      {!loading && allEvents.length > 0 && (
        <>
          <ActivityScreen currentEvent={currentEvent} />
          <EventList />
          <FloatingAddButton />
          <DeleteConfirmModal
            currentUser={currentUser}
            fetchAllEvents={fetchAllEvents}
          />
        </>
      )}

      {!loading && allEvents.length === 0 && (
        <Container className="empty-activity">
          <p className="mb-2">You don't have any events added</p>
          <h4>Add your first event</h4>
          <div
            className="empty-add-button mt-3"
            onClick={() => setShowCreateModal(true)}
          >
            <box-icon
              name="plus"
              type="logo"
              size="md"
              color="white"
            ></box-icon>
          </div>
        </Container>
      )}

      {!loading && currentEvent && (
        <EventEditModal
          currentUser={currentUser}
          fetchAllEvents={fetchAllEvents}
        />
      )}

      <EventCreationModal
        currentUser={currentUser}
        fetchAllEvents={fetchAllEvents}
      />
    </div>
  );
};
const condition = (authUser) => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(ActivityPage);
