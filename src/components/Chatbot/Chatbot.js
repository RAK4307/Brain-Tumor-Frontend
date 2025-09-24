import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Chatbot.css';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am NeuroCare AI, your assistant for the DeepNeuroVision application. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messageIdCounter = useRef(2); // Start after initial message
  const messagesEndRef = useRef(null);
  const { token, isLoggedIn } = useAuth(); // Get token and login status

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When the chatbot opens, if the user is not logged in,
  // display a message prompting them to log in.
  useEffect(() => {
    if (open && !isLoggedIn) {
        setMessages([
            { id: 1, sender: 'bot', text: 'Please log in to use the chatbot.' }
        ]);
    } else if (open && isLoggedIn && messages.length > 0 && messages[0].text.includes('log in')) {
        // If they log in while the chatbot is open, reset the welcome message.
        setMessages([{ id: 1, sender: 'bot', text: 'Hi! I am NeuroCare AI, your assistant for the DeepNeuroVision application. How can I help you today?' }]);
    }
  }, [open, isLoggedIn, messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isLoggedIn) return; // Don't send if not logged in

    const userMessage = {
      id: messageIdCounter.current++,
      sender: 'user',
      text: input,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput(''); // Clear input immediately for better UX
    setLoading(true);

    try {
      const chatbotApiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
      // Add the Authorization header to the request
      const res = await axios.post(`${chatbotApiUrl}/chatbot`, 
        { message: input },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const botMessage = {
        id: messageIdCounter.current++,
        sender: 'bot',
        text: res.data.reply,
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMessage = {
        id: messageIdCounter.current++,
        sender: 'bot',
        text: 'Sorry, something went wrong. Please try again later.',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="chatbot-fab"
        aria-label="Open chatbot"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            NeuroCare AI 🧠
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chatbot">&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-message bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-area" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isLoggedIn ? "Type your question..." : "Please log in to chat"}
              disabled={loading || !isLoggedIn}
              autoFocus
            />
            <button type="submit" disabled={loading || !input.trim() || !isLoggedIn}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;