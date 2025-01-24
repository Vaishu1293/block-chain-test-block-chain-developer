const express = require("express");
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const router = express.Router();

// Routes for notes CRUD operations
router.route("/notes").post(createNote).get(getAllNotes); // Create a note & get all notes
router
  .route("/notes/:id")
  .get(getNoteById) // Get a specific note by ID
  .put(updateNote) // Update a specific note by ID
  .delete(deleteNote); // Delete a specific note by ID

module.exports = router;
