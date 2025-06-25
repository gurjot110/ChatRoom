import { useState, useEffect, useRef } from 'react';
import Message from './Message';
import UserList from './UserList';

const ChatRoom = ({ roomCode, username, messages, users, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Room: {roomCode}</h2>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          <span className="text-gray-400">Connected as: {username}</span>
        </div>
      </div>

      <div className="flex flex-1 gap-6">
        <div className="flex-1 bg-dark-800 rounded-lg p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, index) => (
              <Message
                key={index}
                username={msg.username}
                text={msg.text}
                timestamp={msg.timestamp}
                isCurrentUser={msg.username === username}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-dark-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Send
            </button>
          </form>
        </div>

        <div className="w-64 bg-dark-800 rounded-lg p-4 hidden md:block">
          <h3 className="font-bold mb-4">Active Users</h3>
          <UserList users={users} currentUser={username} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;