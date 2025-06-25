import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import ChatRoom from '../components/ChatRoom';

const Chat = () => {
  const { roomCode } = useParams();
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Prompt for username if not set
    if (!username) {
      const name = prompt('Enter your username:');
      if (name) setUsername(name);
      else window.location.href = '/'; // Redirect if no username provided
    }

    // Initialize socket connection
    if (username && !socket) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');
      setSocket(newSocket);

      // Join room
      newSocket.emit('join_room', { username, room: roomCode });

      // Listen for messages
      newSocket.on('message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      // Listen for user updates
      newSocket.on('user_joined', (newUser) => {
        setUsers((prev) => [...prev, newUser]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [username, roomCode]);

  const sendMessage = (message) => {
    if (socket && message.trim()) {
      // Emit message to server
      socket.emit('send_message', {
        username,
        message,
        room: roomCode
      });

      // Save message to database
      axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/rooms/messages`, {
        room: roomCode,
        username,
        text: message
      }).catch(err => console.error('Failed to save message:', err));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {username && (
        <ChatRoom
          roomCode={roomCode}
          username={username}
          messages={messages}
          users={users}
          onSendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default Chat;