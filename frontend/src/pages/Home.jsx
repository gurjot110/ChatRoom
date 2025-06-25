import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('create');
  const navigate = useNavigate();

  const handleRoomCreated = (roomCode) => {
    navigate(`/chat/${roomCode}`);
  };

  return (
    <div className="max-w-md mx-auto bg-dark-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex border-b border-gray-700">
        <button
          className={`flex-1 py-4 px-6 font-medium ${activeTab === 'create' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Room
        </button>
        <button
          className={`flex-1 py-4 px-6 font-medium ${activeTab === 'join' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('join')}
        >
          Join Room
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'create' ? (
          <CreateRoom onRoomCreated={handleRoomCreated} />
        ) : (
          <JoinRoom onRoomJoined={handleRoomCreated} />
        )}
      </div>
    </div>
  );
};

export default Home;