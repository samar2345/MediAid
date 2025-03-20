import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import axios from "axios";

// const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const apiKey = import.meta.env.REACT_APP_GEMINI_API_KEY;
console.log("API Key:", apiKey);



const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, user: "You" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
`       https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateText?key=${apiKey}`,        {
          contents: [{ role: "user", parts: [{ text: input }] }],
        }
      );

      const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      setMessages([...newMessages, { text: botReply, user: "MediAid Chatbot" }]);
    } catch (error) {
      console.error("Gemini API error:", error.response?.data || error);
      const errorMessage = error.response?.data?.error?.message || "Error fetching response. Please try again.";
      setMessages([...newMessages, { text: errorMessage, user: "MediAid Chatbot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
            <span>MediAid Chatbot</span>
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>
          <div className="p-3 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 rounded-md ${msg.user === "You" ? "bg-blue-100 self-end" : "bg-gray-100"}`}>
                <strong>{msg.user}: </strong> {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center p-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-md"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-2 rounded-r-md text-white transition ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Chatbot };
export default Chatbot;
