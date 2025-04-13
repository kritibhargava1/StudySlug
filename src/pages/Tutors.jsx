import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Tutors.css'; // Make sure the CSS file is imported

function Tutors() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Examples that showcase the capabilities of Gemini AI
  const examples = [
    "Explain the concept of photosynthesis.",
    "How do I solve quadratic equations?",
    "What are the main events of World War II?",
    "Can you review my essay?",
    "Help me with calculus homework."
  ];

  // Function to send user's message to the backend
  const sendMessage = async () => {
    if (!userInput.trim()) return; // Do nothing if input is empty

    // Add user's message to chat history
    const newUserMessage = { sender: "user", text: userInput };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      // Send the message to the Gemini API endpoint
      const response = await axios.post('http://localhost:9000/api/gemini-chat', {
        message: userInput,
      });
      
      // Append Gemini's reply to chat history
      const newBotMessage = { sender: "bot", text: response.data.text };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again later." };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
    
    // Clear the input field after sending
    setUserInput("");
  };

  // Handle clicking an example button
  const handleExampleClick = (example) => {
    setUserInput(example);
  };

  // Send message when user hits "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="tutors-container">
      <h1 className="tutors-title">
        Welcome to the Gemini AI Tutor!
      </h1>

      {/* Examples Section */}
      <div className="examples-section">
        <p className="examples-header">Try asking:</p>
        <div className="examples-list">
          {examples.map((example, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => handleExampleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.sender === "user" ? "user" : "bot"}`}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "10px"
              }}
            >
              <div
                className="message-bubble"
                style={{
                  display: 'inline-block',
                  padding: "10px",
                  borderRadius: "15px",
                  backgroundColor: msg.sender === "user" ? "#a2d2ff" : "#e8e8e8",
                  color: "#000",
                  maxWidth: '80%',
                  wordWrap: 'break-word'
                }}
              >
                <strong>{msg.sender === "user" ? "You:" : "Gemini:"}</strong> {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="tutors-input"
            style={{ 
              width: '100%', 
              height: '50px', 
              padding: '0 15px',
              border: '1px solid #2563EB',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #a2d2ff, #cde7ff)',
              color: '#000',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tutors;
