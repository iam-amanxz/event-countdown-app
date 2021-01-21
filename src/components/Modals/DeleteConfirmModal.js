import React, { useState } from "react";
import { Modal, Button, Form, Alert, Container } from "react-bootstrap";
import "./modals.css";
import { useApp } from "../../contexts/AppContext";

const DeleteConfirmModal = () => {
  const {
    deleteEvent,
    error,
    setError,
    fetchAllEvents,
    currentEvent,
    showDeleteModal,
    setShowDeleteModal,
  } = useApp();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await deleteEvent()
        .then(() => {
          console.log("Document successfully deleted!");
          fetchAllEvents();
          setShowDeleteModal(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        className="event-creation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        {error && (
          <Container className="mt-3">
            <Alert variant="danger">{error}</Alert>
          </Container>
        )}
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
    </div>
  );
};

export default DeleteConfirmModal;
