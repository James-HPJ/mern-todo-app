const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Note", notesSchema);
