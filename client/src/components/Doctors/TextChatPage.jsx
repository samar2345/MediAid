import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPaperPlane, 
  FaVideo, 
  FaPhoneAlt, 
  FaUserMd, 
  FaClipboard, 
  FaFileUpload 
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const TextChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I help you today?",
      sender: 'doctor',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const {id} = useParams()
  console.log(id);
  const [doctor, setDoctor] = useState(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'patient',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Implement file upload logic
      console.log('File uploaded:', file);
    }
  };

  useEffect(() => {
      const fetchDoctorDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
          const data = await response.json();
          console.log('Doctor Details:', data);
          setDoctor(data);
        } catch (error) {
          console.error('Error fetching doctor details:', error);
        }
      };
      
      fetchDoctorDetails();
    }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl h-[800px] rounded-2xl shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 rounded-l-2xl p-4 border-r">
          <div className="flex items-center mb-6">
            <FaUserMd className="text-blue-500 mr-3 h-10 w-10" />
            <div>
              <h2 className="text-xl font-bold">Text chat {doctor && `With  ${doctor.name}`}</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              <FaVideo className="mr-2" /> Start Video Call
            </button>
            <button className="w-full flex items-center justify-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              <FaPhoneAlt className="mr-2" /> Call Doctor
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Consultation Details</h3>
            <p className="text-sm text-gray-600">
              Specialty: Emergency Medicine
              <br />
              Consultation Type: Text Chat
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-3/4 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Emergency Consultation</h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-blue-500">
                <FaClipboard />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${
                  message.sender === 'doctor' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'doctor'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                  <div className="text-xs mt-1 opacity-50">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t flex items-center space-x-2">
            <input 
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label 
              htmlFor="fileUpload" 
              className="text-gray-500 hover:text-blue-500 cursor-pointer"
            >
              <FaFileUpload className="h-6 w-6" />
            </label>

            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextChatPage;