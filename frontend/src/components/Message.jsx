// import { format } from 'date-fns';

const Message = ({ username, text, timestamp, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-primary-500' : 'bg-dark-700'}`}
      >
        <div className="flex justify-between items-baseline mb-1">
          <span className={`text-sm font-medium ${isCurrentUser ? 'text-white' : 'text-gray-300'}`}>
            {username}
          </span>
          {/* <span className={`text-xs ml-2 ${isCurrentUser ? 'text-primary-100' : 'text-gray-500'}`}>
            {format(new Date(timestamp), 'h:mm a')}
          </span> */}
          <p>
  {new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })}
</p>
        </div>
        <p className={isCurrentUser ? 'text-white' : 'text-gray-300'}>{text}</p>
      </div>
    </div>
  );
};

export default Message;