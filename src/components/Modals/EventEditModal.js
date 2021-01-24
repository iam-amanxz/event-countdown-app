import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";

import { useEvent } from "../../contexts/EventContext";
import { withFirebase } from "../../Firebase";

import "./modals.css";

const EventEditModal = ({ firebase, currentUser, fetchAllEvents }) => {
  const { showEditModal, setShowEditModal, currentEvent } = useEvent();

  useEffect(() => {
    setFormValues({
      ...formValues,
      title: currentEvent.title,
      backgroundUrl: currentEvent.backgroundUrl,
    });
    setDate(new Date(currentEvent.date.seconds * 1000));
  }, [currentEvent]);

  const [formValues, setFormValues] = useState({
    title: "",
    backgroundUrl: "",
    progress: 0,
    error: null,
    loading: false,
  });

  const [date, setDate] = useState(new Date());

  const [imageAsFile, setImageAsFile] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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

  const handleBackgroundImageUpload = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      error: "",
      loading: true,
    });

    try {
      firebase.uploadBackGroundImage(imageAsFile).on(
        "state_changed",
        (snapshot) => {
          setFormValues({
            ...formValues,
            loading: true,
            progress: Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ),
          });
        },
        (e) => {
          console.log(e);
          setFormValues({
            ...formValues,
            error: e,
          });
        },
        () => {
          console.log("Image Uploaded");
          firebase
            .getBackgroundImageUrl(imageAsFile)
            .then((url) => {
              console.log("Got Url");
              setFormValues({
                ...formValues,
                backgroundUrl: url,
                progress: 0,
              });
              setImageAsFile("");
            })
            .catch((e) => {
              setFormValues({
                ...formValues,
                error: e,
              });
            });
        }
      );
    } catch (e) {
      setFormValues({
        ...formValues,
        error: e,
      });
    }

    setFormValues({
      ...formValues,
      loading: false,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setFormValues({
      ...formValues,
      error: "",
      loading: true,
    });

    try {
      const { title, backgroundUrl } = formValues;
      const updatedData = {
        title: title,
        backgroundUrl: backgroundUrl,
        date: date,
      };

      firebase
        .updateEvent(currentEvent.id, updatedData, currentUser.id)
        .then(() => {
          console.log("Document successfully updated!");
          fetchAllEvents();
        })
        .catch((e) => {
          console.log(e);
          setFormValues({
            ...formValues,
            error: e.message,
          });
        });
      setShowEditModal(false);
    } catch (e) {
      setFormValues({
        ...formValues,
        error: e,
      });
    }

    setFormValues({
      ...formValues,
      loading: false,
    });
  };

  return (
    <Modal show={showEditModal} className="event-creation-modal">
      <Modal.Header>
        <Modal.Title>Update event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              required
              type="text"
              placeholder="Enter title"
              name="title"
              value={formValues.title}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate" className="d-flex flex-column">
            <Form.Label>Event Date</Form.Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              minDate={new Date()}
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage" className="d-flex flex-column">
            <Form.Label>Event Background</Form.Label>
            <div className="d-flex">
              <img
                className="preview-img mr-3"
                src={formValues.backgroundUrl}
                alt="bg"
              />
              <div>
                <ProgressBar
                  striped
                  variant="warning"
                  now={formValues.progress}
                />
                <Form.File
                  className="my-3"
                  accept="image/png, image/jpeg"
                  onChange={handleOnFileChange}
                />
                <Button
                  variant="primary"
                  disabled={formValues.loading || imageAsFile === ""}
                  onClick={handleBackgroundImageUpload}
                >
                  Upload Image
                </Button>
              </div>
            </div>
          </Form.Group>

          {formValues.error && (
            <Alert variant="danger">{formValues.error}</Alert>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="success" type="submit" disabled={formValues.loading}>
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default withFirebase(EventEditModal);
