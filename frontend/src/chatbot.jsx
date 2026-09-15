import { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! 👋 I’m your Lost & Found assistant. How can I help you?'
    }
  ]);

const getBotReply = (text) => {
  const question = text.toLowerCase();

  // Greetings
  if (
    question.includes('hello') ||
    question.includes('hi') ||
    question.includes('hey')
  ) {
    return 'Hello! 😊 I’m your Lost & Found assistant. How can I help you?';
  }

  // Report Lost
  if (
    question.includes('lost') ||
    question.includes('report lost')
  ) {
    return 'To report a lost item, click "Report Lost" and enter the item name, category, description, location, date and contact details.';
  }

  // Report Found
  if (
    question.includes('found') ||
    question.includes('report found')
  ) {
    return 'If you found someone’s item, click "Report Found" and provide the item details, location, date and contact information.';
  }

  // Search Items
  if (
    question.includes('search') ||
    question.includes('find item') ||
    question.includes('look for')
  ) {
    return 'You can search for items from the "Lost & Found Items" page using the search box. You can also filter items by Lost or Found status. 🔎';
  }

  // Items Page
  if (
    question.includes('items') ||
    question.includes('reported items') ||
    question.includes('see items')
  ) {
    return 'Open "Lost & Found Items" to view all items reported by users. You can search and filter them there.';
  }

  // My Reports
  if (
    question.includes('my reports') ||
    question.includes('my report') ||
    question.includes('reports')
  ) {
    return 'You can open "My Reports" to see the lost and found items you have reported. 👤';
  }

  // Login
  if (
    question.includes('login') ||
    question.includes('log in') ||
    question.includes('sign in')
  ) {
    return 'Click "Login" and enter your registered email and password to access your account. 🔐';
  }

  // Register
  if (
    question.includes('register') ||
    question.includes('registration') ||
    question.includes('create account') ||
    question.includes('sign up')
  ) {
    return 'Click "Register" to create a new Lost & Found account. 📝';
  }

  // Logout
  if (
    question.includes('logout') ||
    question.includes('log out') ||
    question.includes('sign out')
  ) {
    return 'If you are logged in, click the "Logout" button in the navigation bar to safely sign out. 🚪';
  }

  // Location
  if (
    question.includes('location') ||
    question.includes('where')
  ) {
    return 'When reporting an item, provide the city and exact location where the item was lost or found. 📍';
  }

  // Contact
  if (
    question.includes('contact') ||
    question.includes('phone') ||
    question.includes('contact person')
  ) {
    return 'Contact details can be provided while reporting an item. Use the available contact information to get in touch regarding the reported item. 📞';
  }

  // Category
  if (
    question.includes('category') ||
    question.includes('type of item')
  ) {
    return 'Select the category that best matches your item, such as Electronics, Documents, Accessories or Personal Items. 🏷️';
  }

  // Required details
  if (
    question.includes('details') ||
    question.includes('information') ||
    question.includes('what should i enter')
  ) {
    return 'When reporting an item, provide the item name, category, description, location, date and contact details so it can be identified easily.';
  }

  // Login requirement
  if (
    question.includes('need login') ||
    question.includes('login required') ||
    question.includes('without login')
  ) {
    return 'You need to log in to report a lost or found item and access your personal reports. 🔐';
  }

  
if (
  question.includes('not found') ||
  question.includes("can't find") ||
  question.includes('cannot find') ||
  (question.includes('find') && question.includes('item'))
) {
  return 'If you cannot find your item, try searching with different keywords or check both the Lost and Found filters. 🔎';
}



  // About application
  if (
    question.includes('about') ||
    question.includes('what is this') ||
    question.includes('what does this app do')
  ) {
    return 'Lost & Found helps users report lost belongings, report found items and search reported items to help reunite belongings with their owners. ❤️';
  }

  // Help
  if (
    question.includes('help') ||
    question.includes('what can you do')
  ) {
    return 'I can help you with reporting lost or found items, searching and filtering items, My Reports, login, registration, logout, locations and contact information. 😊';
  }

  // Default reply
  return 'I can help you with Lost & Found features such as reporting items, searching, filtering, My Reports, login, registration and more. Try asking me something! 😊';
};



  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: 'user',
      text: message
    };

    const botMessage = {
      sender: 'bot',
      text: getBotReply(message)
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage
    ]);

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot">

          <div className="chat-header">
            <div>
              <h3>Lost & Found Assistant</h3>
              <span>● Online</span>
            </div>

            <button
              className="close-chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chat-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}

          </div>

          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleSend}>
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;