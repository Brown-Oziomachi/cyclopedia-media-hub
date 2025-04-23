import React, { useState } from 'react';

const ChatIcon = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    const newMessage = {
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <button
        onClick={() => setShowChat(!showChat)}
        className="bg-cyan-700 hover:bg-blue-700 text-white font-bold py-5 px-5 rounded-lg"
      >
        <span className="text-xl grid">Chat</span>
        <i className="fas fa-comments"></i>
      </button>
      {showChat && (
        <div className="w-64 h-96 bg-gray-900/90 rounded-lg shadow-lg mt-2">
          <div className="p-4">
            <h2 className="text-lg font-bold">Chat with us</h2>
            <ul className="mt-4">
              {messages.map((message, index) => (
                <li key={index} className="mb-2">
                  <span className="text-sm">{message.text}</span>
                  <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 mt-4 border border-gray-300 rounded-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
