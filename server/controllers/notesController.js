const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// In-memory data store for notes
let notes = [];

// Create a new note
exports.createNote = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Title and content are required", 400));
  }

  const note = {
    id: notes.length + 1, // Simple incrementing ID
    title,
    content,
    createdAt: new Date(),
  };

  notes.push(note);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

// Get all notes
exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    notes,
  });
});

// Get a specific note by ID
exports.getNoteById = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// Update a specific note by ID
exports.updateNote = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  const { title, content } = req.body;

  if (title) note.title = title;
  if (content) note.content = content;

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

// Delete a specific note by ID
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return next(new ErrorHandler("Note not found", 404));
  }

  notes.splice(noteIndex, 1);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
