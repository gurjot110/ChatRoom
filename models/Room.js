const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const roomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(6).toUpperCase()
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

module.exports = mongoose.model('Room', roomSchema);