import React from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import NoteItem from "./NoteItem";

const NotesGrid = (props) => {
  return (
    <Container className="mt-5 mb-4">
      <Card>
        <Card.Header>Todo List</Card.Header>
        <ListGroup as="ul">
          {props.notes.map((note) => (
            <NoteItem
              note={note}
              key={note.id}
              onDelete={props.onDelete}
              onSubmitChanges={props.onSubmitChanges}
            />
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default NotesGrid;
