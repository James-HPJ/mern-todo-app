const mongoose = require("mongoose");
const Note = require("../models/notes-schema");
const HttpError = require("../models/http-error");

const getNotes = async (req, res, next) => {
  let notes;
  try {
    notes = await Note.find();
  } catch (err) {
    const error = new HttpError("Could not retrieve notes from DB", 500);
    return next(error);
  }

  if (notes.length < 1) {
    const error = new HttpError("No notes written yet, pls add one!", 400);
    return next();
  }

  res.json({ notes: notes.map((note) => note.toObject({ getters: true })) });
};

const createNote = async (req, res, next) => {
  // TODO: add input validation on backend side, use validation package

  const { title, content, date } = req.body;

  const newNote = new Note({
    title,
    content,
    date,
  });

  try {
    await newNote.save();
  } catch (err) {
    const error = new HttpError("Could not save your note to DB", 500);
    return next(error);
  }

  res.json({ result: "ok" });
};

const deleteNote = async (req, res, next) => {
  const noteId = req.params.nid;

  try {
    await Note.findByIdAndDelete(noteId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete note",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "note deleted!" });
};

const patchNote = async (req, res, next) => {
  const noteId = req.params.nid;

  const { title, content, date } = req.body;

  let note;
  try {
    note = await Note.findById(noteId);
  } catch (err) {
    const error = new HttpError("could not update place in DB", 500);
    return next(error);
  }

  note.title = title;
  note.content = content;
  note.date = date;

  try {
    await note.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update place",
      500
    );

    return next(error);
  }

  res.status(200).json({ note: note.toObject({ getters: true }) });
};

exports.getNotes = getNotes;
exports.createNote = createNote;
exports.deleteNote = deleteNote;
exports.patchNote = patchNote;
