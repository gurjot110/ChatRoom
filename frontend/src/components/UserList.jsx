const UserList = ({ users, currentUser }) => {
    const uniqueUsers = [...new Set([currentUser, ...users])];
  
    return (
      <ul className="space-y-2">
        {uniqueUsers.map((user, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className={user === currentUser ? 'text-primary-500 font-medium' : 'text-gray-400'}>
              {user}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  
  export default UserList;