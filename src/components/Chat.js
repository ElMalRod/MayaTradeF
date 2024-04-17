import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
    const [conversations, setConversations] = useState({});
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const userName = localStorage.getItem('userName'); // Suponiendo que el nombre del usuario está almacenado aquí
    const userId = localStorage.getItem('userId'); // Suponiendo que el ID del usuario está almacenado aquí

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/messages/user`, { params: { user_name: userName } });
            const data = response.data;
            // Invertir cada array de mensajes para cada usuario
            Object.keys(data).forEach(key => {
                data[key] = data[key].reverse();
            });
            setConversations(data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const sendMessage = async () => {
        if (!selectedConversation) return;
        try {
            const response = await axios.post('http://localhost:8000/api/send-message', {
                sender_name: userName,
                recipient_name: selectedConversation,
                content: newMessage
            });
            setNewMessage('');
            fetchConversations();  // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="w-full flex">
            <div className="w-1/4 bg-gray-200 h-screen overflow-auto">
                <div className="flex flex-col">
                    {Object.keys(conversations).map((user, index) => (
                        <button key={index} className="p-2 hover:bg-gray-300" onClick={() => setSelectedConversation(user)}>
                            {user}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-4">
                <div className="h-full flex flex-col justify-between">
                    <div className="overflow-auto">
                        {selectedConversation && conversations[selectedConversation].map((msg, index) => (
                            <div key={index} className={`p-2 flex ${msg.sender_id === parseInt(userId) ? 'justify-end' : 'justify-start'}`}>
                                <div className={`inline-block p-2 rounded shadow ${msg.sender_id === parseInt(userId) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    {msg.content}
                                    <div className="text-xs text-gray-600">{new Date(msg.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2">
                        <textarea
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Write a message..."
                        />
                        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded shadow mt-2">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
