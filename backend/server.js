require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/rooms', require('./routes/roomRoutes'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a room
  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);
    
    // Welcome current user
    socket.emit('message', {
      username: 'ChatBot',
      text: `Welcome to the chat, ${username}!`,
      timestamp: new Date()
    });

    // Broadcast to room that a user has joined
    socket.broadcast.to(room).emit('message', {
      username: 'ChatBot',
      text: `${username} has joined the chat`,
      timestamp: new Date()
    });

    // Add user to room's user list
    socket.to(room).emit('user_joined', username);
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    io.to(data.room).emit('message', {
      username: data.username,
      text: data.message,
      timestamp: new Date()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});