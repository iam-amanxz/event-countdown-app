import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import { useEvent } from "../../contexts/EventContext";
import { withFirebase } from "../../Firebase";

const DeleteConfirmModal = ({ firebase, fetchAllEvents, currentUser }) => {
  const { currentEvent, showDeleteModal, setShowDeleteModal } = useEvent();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      firebase
        .deleteEvent(currentUser.id, currentEvent.id)
        .then(() => {
          console.log("Document successfully deleted!");
          fetchAllEvents();
          setShowDeleteModal(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show={showDeleteModal} className="event-creation-modal">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleFormSubmit}>
        <Modal.Footer>
          <Button
            block
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={loading}
          >
            No
          </Button>
          <Button block variant="danger" type="submit" disabled={loading}>
            Yes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default withFirebase(DeleteConfirmModal);
