import React, { useCallback, useEffect, useState } from "react";
import NoteForm from "../NoteForm";
import EmptyNotes from "../UI/EmptyNotes";
import LoadingSpinner from "../UI/LoadingSpinner";
import NotesGrid from "./NotesGrid";

const NotesLayout = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL);

      if (!response.ok) {
        throw new Error("unable to fetch notes!");
      }

      const data = await response.json();

      setNotes(data.notes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const submitNewNote = async (formInputValue) => {
    const newNote = {
      title: formInputValue.title,
      date: formInputValue.date,
      content: formInputValue.content,
    };

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("we could not submit your note");
      }

      const results = await response.json();

      console.log(results);
    } catch (error) {
      throw new Error(error.message);
    }

    fetchNotes();
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("could not delete note");
      }
    } catch (error) {
      throw new Error(error);
    }

    fetchNotes();
  };

  const editNote = async (inputValues, noteId) => {
    const editedNote = {
      title: inputValues.title,
      date: inputValues.date,
      content: inputValues.content,
    };

    console.log(editedNote);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${noteId}`,
        {
          method: "PATCH",
          body: JSON.stringify(editedNote),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("could not edit note");
      }
    } catch (error) {
      throw new Error(error);
    }

    fetchNotes();
  };

  return (
    <>
      <NoteForm onSubmit={submitNewNote} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && notes.length === 0 && <EmptyNotes />}
      {!isLoading && notes.length > 0 && (
        <NotesGrid
          notes={notes}
          onDelete={deleteNote}
          onSubmitChanges={editNote}
        />
      )}
    </>
  );
};

export default NotesLayout;
