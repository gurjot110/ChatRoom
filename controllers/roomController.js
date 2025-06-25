const Room = require('../models/Room');
const Message = require('../models/Message');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room();
    await room.save();
    res.status(201).json({ code: room.code });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

// Join an existing room
exports.joinRoom = async (req, res) => {
  try {
    const { code } = req.params;
    const room = await Room.findOne({ code });
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Get last 24 hours of messages
    const messages = await Message.find({
      room: code,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).sort({ timestamp: 1 });

    res.json({ exists: true, messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join room' });
  }
};

// Save a message
exports.saveMessage = async (req, res) => {
  try {
    const { room, username, text } = req.body;
    const message = new Message({ room, username, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};