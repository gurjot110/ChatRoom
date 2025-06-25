import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-dark-800 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">
            Chat<span className="text-primary-500">App</span>
          </Link>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/chat-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;