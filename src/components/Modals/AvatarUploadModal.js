import React, { useState } from "react";
import { Modal, Button, Form, Alert, ProgressBar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";

import "./modals.css";

const AvatarUploadModal = ({
  history,
  firebase,
  currentUser,
  setShowAvatarUploadModal,
  showAvatarUploadModal,
}) => {
  const INITIAL_STATE = {
    avatarUrl: "",
    progress: 0,
    error: null,
    loading: false,
  };
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const [imageAsFile, setImageAsFile] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const handleOnFileChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageAsFile(image);
    } else {
      setImageAsFile("");
    }
  };

  const handleAvatarImageUpload = () => {
    setFormValues({
      ...formValues,
      error: null,
      loading: true,
    });
    setUploaded(false);

    try {
      firebase.uploadAvatarImage(imageAsFile).on(
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
          setUploaded(true);
          firebase
            .getAvatarImageUrl(imageAsFile)
            .then((url) => {
              console.log("Got Url");
              setFormValues({
                ...formValues,
                avatarUrl: url,
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
      error: null,
      loading: true,
    });

    try {
      const { avatarUrl } = formValues;
      console.log("trying", avatarUrl);
      firebase
        .updateAvatarUrl(avatarUrl, currentUser.id)
        .then(() => {
          console.log("Avatar successfully updated!");
          setFormValues({
            ...formValues,
            avatarUrl: "",
          });
          history.go(0);
        })
        .catch((e) => {
          console.log("Error");
          setFormValues({
            ...formValues,
            error: e.message,
          });
        });
      setShowAvatarUploadModal(false);
    } catch (e) {
      console.log(e);
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
    <Modal show={showAvatarUploadModal} className="event-creation-modal">
      <Modal.Header>
        <Modal.Title>Upload a new avatar</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Body>
          <Form.Group controlId="formBasicImage">
            <div className="text-center">
              {formValues.avatarUrl !== "" && (
                <img
                  className="preview-img mb-3"
                  src={formValues.avatarUrl}
                  alt="avatar"
                />
              )}
              <div>
                <ProgressBar
                  striped
                  variant="warning"
                  now={formValues.progress}
                />
                <Form.File
                  className="my-3"
                  style={{ display: "inline-block" }}
                  accept="image/png, image/jpeg"
                  onChange={handleOnFileChange}
                />
                <Button
                  block
                  variant="primary"
                  disabled={formValues.loading || imageAsFile === ""}
                  onClick={handleAvatarImageUpload}
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
          <Button
            variant="secondary"
            onClick={() => setShowAvatarUploadModal(false)}
          >
            Discard
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={formValues.loading || !uploaded}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default withRouter(withFirebase(AvatarUploadModal));
