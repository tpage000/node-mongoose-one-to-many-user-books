const express = require('express');
const router = express.Router();

const User   = require('../models/users');
const Book   = require('../models/books');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.books = await Book.find({ user: user._id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete(':/id', async (req, res) => {
  console.log('delete route');
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Book.remove({ user: user.id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
