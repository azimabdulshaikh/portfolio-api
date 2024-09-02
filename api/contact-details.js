const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema for the message
const messageSchema = new mongoose.Schema({
  name: String,
  mobileNo: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// POST request to create a new message
router.post('/', async (req, res) => {
  try {
    const { name, mobileNo, message } = req.body;

    // Validate input
    if (!name || !mobileNo || !message) {
      return res.status(400).json({ error: 'Name, mobile number, and message are required' });
    }

    // Create a new message document
    const newMessage = new Message({
      name,
      mobileNo,
      message
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message created successfully', data: newMessage });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;