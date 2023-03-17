import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useForm from "../../hooks/use-form";

const EditNoteModal = (props) => {
  const {
    formInput,
    contentInputHandler,
    titleInputHandler,
    dateInputHandler,
    resetInputs,
  } = useForm();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitChangesHandler = (event) => {
    event.preventDefault();

    props.onSubmitChanges(formInput, props.noteId);

    resetInputs();
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitChangesHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                value={formInput.title}
                onChange={(event) => titleInputHandler(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) => contentInputHandler(event.target.value)}
                value={formInput.content}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(event) => dateInputHandler(event.target.value)}
                value={formInput.date}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditNoteModal;
