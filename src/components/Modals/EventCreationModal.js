import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  Container,
  ProgressBar,
} from "react-bootstrap";
import "./modals.css";
import { useApp } from "../../contexts/AppContext";
import firebase from "firebase/app";
import { storage } from "../../firebase";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

const EventCreationModal = () => {
  const {
    editMode,
    addEvent,
    currentUser,
    currentEvent,
    error,
    setError,
    showCreateModal,
    setShowCreateModal,
    fetchAllEvents,
    uploadBackgroundImage,
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/event-countdwon.appspot.com/o/backgroundImages%2Fbg.jpg?alt=media&token=e44c02c2-6cdc-46d4-b1cb-0bd76a664c34"
  );

  const eventTitleRef = useRef();

  const handleClose = () => setShowCreateModal(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const event = {
      title: eventTitleRef.current.value,
      date: selectedDay,
      backgroundUrl: backgroundUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setLoading(true);
    setError("");
    try {
      await addEvent(event)
        .then(() => {
          console.log("Document successfully updated!");
          fetchAllEvents();
        })
        .catch((e) => {
          setError(e.message);
          console.error(e.message);
        });
      setShowCreateModal(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
    eventTitleRef.current.value = "";
  };

  const today = new Date();
  const defaultDateValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultDateValue);

  const [imageAsFile, setImageAsFile] = useState("");

  const handleOnFileChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageAsFile(image);
      console.log("Photo selected");
    } else {
      setImageAsFile("");
      console.log("No Photo selected");
    }
  };

  const handleUploadImage = async (e) => {
    if (imageAsFile == "") {
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      await uploadBackgroundImage(imageAsFile).on(
        "state_changed",
        (snapshot) => {
          setProgress(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          console.log(error);
          setError(error);
        },
        () => {
          storage
            .ref(`backgroundImages/${currentUser.id}/${currentEvent.id}`)
            .child(imageAsFile.name)
            .getDownloadURL()
            .then((url) => {
              setBackgroundUrl(url);
              setProgress(0);
              setImageAsFile("");
            });
        }
      );
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

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
              controlId="formBasicDate"
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
            <Form.Group
              controlId="formBasicImage"
              className="d-flex flex-column"
            >
              <Form.Label>Event Background</Form.Label>
              <div className="d-flex">
                <img className="preview-img mr-3" src={backgroundUrl} />
                <div>
                  <ProgressBar striped variant="warning" now={progress} />
                  <Form.File
                    className="my-3"
                    accept="image/png, image/jpeg"
                    onChange={handleOnFileChange}
                  />
                  <Button
                    variant="success"
                    disabled={loading}
                    onClick={handleUploadImage}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {editMode ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EventCreationModal;
