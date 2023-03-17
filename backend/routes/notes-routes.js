const express = require("express");
const notesControllers = require("../controllers/notes");

const router = express.Router();

router.get("/", notesControllers.getNotes);

router.post("/", notesControllers.createNote);

router.delete("/:nid", notesControllers.deleteNote);

router.patch("/:nid", notesControllers.patchNote);

module.exports = router;
