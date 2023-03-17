import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useForm from "../hooks/use-form";

const NoteForm = (props) => {
  const {
    formInput,
    contentInputHandler,
    titleInputHandler,
    dateInputHandler,
    resetInputs,
  } = useForm();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(formInput);

    props.onSubmit(formInput);

    resetInputs();
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={formSubmitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            value={formInput.title}
            onChange={(event) => titleInputHandler(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your Note here</Form.Label>
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
        <Button type="submit" disabled={!formInput.isValid}>
          Add Note
        </Button>
      </Form>
    </Container>
  );
};

export default NoteForm;
