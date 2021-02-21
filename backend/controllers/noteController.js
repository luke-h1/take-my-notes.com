import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Note from '../models/noteModel.js';

// @desc    Create a new Note
// @route   POST /api/notes
// @access  Private
// needs manual testing
// needs jest test
const addNote = asyncHandler(async (req, res) => {
  const {
    title,
    body,
    date,
  } = req.body;
  if (title && title.length === 0) {
    res.status(400);
    throw new Error('Enter a Title');
  } else if (body && body.length === 0) {
    res.status(400);
    throw new Error('Enter a body');
  } else {
    const note = new Note({
      title,
      date,
      body,
      user: req.user._id,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

// @desc    GET note by ID
// @route   GET /api/notes/:id
// @access  Private
// needs manual testing
// needs jest test
// need to test if other users can get another users note

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).populate(
    'user',
    'body',
    'title',
  );
  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

export {
  addNote,
  getNoteById,
};
