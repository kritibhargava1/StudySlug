import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

function ChatPopup({ recipientEmail, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setUserEmail(user.email);
      const res = await axios.get(`http://localhost:4000/api/get-messages/${user.email}/${recipientEmail}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [recipientEmail]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post('http://localhost:4000/api/send-message', {
      from: userEmail,
      to: recipientEmail,
      message: input
    });
    setMessages(prev => [...prev, { from: userEmail, to: recipientEmail, message: input }]);
    setInput('');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      width: '300px',
      zIndex: 9999
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Chat with {recipientEmail}
        <button onClick={onClose} style={{ float: 'right', border: 'none', background: 'transparent' }}>❌</button>
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '0.5rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '6px', textAlign: msg.from === userEmail ? 'right' : 'left' }}>
            <span style={{ background: msg.from === userEmail ? '#d1fae5' : '#e0e7ff', padding: '5px 10px', borderRadius: '10px' }}>
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: '8px' }}>Send</button>
    </div>
  );
}

export default ChatPopup;
