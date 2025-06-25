import { useState } from 'react';
import axios from 'axios';

const CreateRoom = ({ onRoomCreated }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRoom = async () => {
    setIsCreating(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/rooms`
      );
      onRoomCreated(response.data.code);
    } catch (err) {
      setError('Failed to create room. Please try again.');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Create a New Chat Room</h2>
      <button
        onClick={handleCreateRoom}
        disabled={isCreating}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
      >
        {isCreating ? 'Creating...' : 'Create Room'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <p className="mt-4 text-gray-400">
        Share the room code with friends to start chatting!
      </p>
    </div>
  );
};

export default CreateRoom;