import { useState } from 'react';
import axios from 'axios';

const JoinRoom = ({ onRoomJoined }) => {
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    
    setIsJoining(true);
    setError('');
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/rooms/${roomCode.trim().toUpperCase()}`
      );
      
      if (response.data.exists) {
        onRoomJoined(roomCode.trim().toUpperCase());
      } else {
        setError('Room not found. Please check the code and try again.');
      }
    } catch (err) {
      setError('Failed to join room. Please try again.');
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Join an Existing Room</h2>
      <form onSubmit={handleJoinRoom}>
        <div className="mb-4">
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter room code"
            className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            maxLength="6"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isJoining || !roomCode.trim()}
          className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {isJoining ? 'Joining...' : 'Join Room'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default JoinRoom;