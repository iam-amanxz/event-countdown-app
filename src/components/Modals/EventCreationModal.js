import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert, Container } from "react-bootstrap";
import "./event-creation-modal.css";
import { useApp } from "../../contexts/AppContext";
import firebase from "firebase";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

const EventCreationModal = () => {
  const {
    editMode,
    addOrEditEvent,
    error,
    setError,
    showCreateModal,
    setShowCreateModal,
  } = useApp();

  const [show, setShow] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  const eventTitleRef = useRef();

  const handleClose = () => setShowCreateModal(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const event = {
      title: eventTitleRef.current.value,
      date: selectedDay,
      backgroundUrl: backgroundUrl
    };
    console.log(event);

    // setError("");
    // try {
    //   await addOrEditEvent({
    //     id: "59ov4e2gpMrs1Ro2zc8K",
    //     eventTitle: eventTitleRef.current.value,
    //   })
    //     .then(() => {
    //       console.log("Document successfully updated!");
    //     })
    //     .catch((e) => {
    //       setError(e.message);
    //       console.error(e.message);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
    // eventTitleRef.current.value = "";
  };

  const today = new Date();
  const defaultDateValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultDateValue);

  // useEffect(() => {
  //   console.log(selectedDay);
  // }, [selectedDay]);

  return (
    <div>
      <Modal
        show={showCreateModal}
        onHide={handleClose}
        className="event-creation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {!editMode ? " Create a new event" : "Update event"}
          </Modal.Title>
        </Modal.Header>
        {error && (
          <Container className="mt-3">
            <Alert variant="danger">{error}</Alert>
          </Container>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                ref={eventTitleRef}
                required
                type="text"
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              className="d-flex flex-column"
            >
              <Form.Label>Event Date</Form.Label>
              <DatePicker
                value={selectedDay}
                onChange={setSelectedDay}
                inputPlaceholder="Select a date"
                shouldHighlightWeekends
                minimumDate={utils().getToday()}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editMode ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCreationModal;
