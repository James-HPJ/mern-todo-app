import React from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditNoteModal from "./EditNoteModal";

const NoteItem = (props) => {
  const note = props.note;

  const deleteNoteHandler = () => {
    const proceed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (proceed) {
      //api to delete

      props.onDelete(note.id);
    }
  };

  return (
    <ListGroupItem as="li" key={note.id}>
      <Card border="primary">
        <Card.Header>{note.title}</Card.Header>
        <Card.Body>
          <Card.Title>{note.date}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          <EditNoteModal
            onSubmitChanges={props.onSubmitChanges}
            noteId={note.id}
          />
          <Button
            variant="primary"
            onClick={deleteNoteHandler}
            className="ms-2"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </ListGroupItem>
  );
};

export default NoteItem;
