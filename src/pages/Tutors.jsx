// src/pages/Tutors.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Tutors() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Function that sends the user's message to the backend Gemini API endpoint
  const sendMessage = async () => {
    if (!userInput.trim()) return;  // do nothing if input is empty

    // Add user message to the chat history
    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      // Send the message to the Node.js backend
      const response = await axios.post('http://localhost:9000/api/gemini-chat', {
        message: userInput,
        // Optionally, include chat history if required by your API
        // history: messages,
      });
      
      // Add the bot's reply to the chat history
      const newBotMessage = { sender: "bot", text: response.data.text };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      // In case of error, add an error message to the chat history
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again later." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
    // Clear the input field
    setUserInput("");
  };

  // When user hits the "Enter" key, send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-purple-700">Tutors</h1>
      <p className="mt-4 text-gray-600">
        Need help in a subject? We’ll match you with available tutors taking the same classes.
      </p>
      
      {/* Chat Interface */}
      <div className="chat-box mt-6 border border-gray-300 p-4 rounded">
        <div
          className="messages mb-4"
          style={{ height: '300px', overflowY: 'scroll', background: '#f9f9f9', padding: '10px' }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: "8px"
              }}
            >
              <span style={{ fontWeight: "bold", color: msg.sender === "user" ? "#2563EB" : "#16A34A" }}>
                {msg.sender === "user" ? "You:" : "Gemini:"}
              </span>{" "}
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-r-0 rounded-l"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-purple-700 text-white rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tutors;
