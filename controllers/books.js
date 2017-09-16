const express = require('express');
const router = express.Router();

const Book    = require('../models/books');

router.get('/', async (req, res) => {
  const books = await Book.find().populate('user');
  res.status(200).json(books);
});

router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
