import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Tutors.css';

function Tutors() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Function to send the user's message to the backend Gemini API endpoint
  const sendMessage = async () => {
    if (!userInput.trim()) return; // Avoid sending empty messages

    // Add user's message to chat history
    const newUserMessage = { sender: "user", text: userInput };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:9000/api/gemini-chat', { message: userInput });
      
      // Add Gemini's reply to chat history
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

  // Trigger sendMessage() when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="tutors-container">
      <h1 className="tutors-title">Gemini AI Tutor</h1>
      
      {/* Chat Interface */}
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.sender === "user" ? "user" : "bot"}`}>
              <div className="message-bubble">
                <strong>{msg.sender === "user" ? "You:" : "Gemini:"}</strong> {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area: Removed the send button */}
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message and hit enter..."
            className="tutors-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Tutors;
