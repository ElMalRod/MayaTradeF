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
            console.error('Error al recuperar conversaciones:', error);
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
            console.error('Error al enviar mensaje:', error);
        }
    };

    return (
        <div className="w-full flex">
            <div className="w-1/4 bg-gray-200 h-screen overflow-auto p-4">
                <div class="p-4 flex items-center bg-gray-300 rounded-lg ">
                    <div class="flex items-center gap-2 text-neutral-600">
                        <p class="font-medium">Mensajes</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="ml-auto h-5 w-5 text-neutral-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                </div>
                <div className="flex flex-col mt-2">
                    {Object.keys(conversations).map((user, index) => (
                        <button key={index} className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors duration-300 hover:bg-gray-300" onClick={() => setSelectedConversation(user)}>
                            <div className="h-[42px] w-[42px] shrink-0 rounded-full">
                                <img src={`https://picsum.photos/${index + 200}/500`} className="h-full w-full rounded-full object-cover" alt="" />
                            </div>
                            <div className="overflow-hidden text-left">
                                <h2 className="truncate text-sm font-medium text-neutral-600">{user}</h2>
                            </div>
                        </button>
                    ))}
                </div>

            </div>
            <div className="flex-1 ">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col bg-gray-50 p-2">
                        <button className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors duration-300 hover:bg-gray-300">
                            <div class="h-[42px] w-[42px] shrink-0 rounded-full">
                                <img src="https://picsum.photos/700/800" class="h-full w-full rounded-full object-cover" alt="" />
                            </div>
                            <div class="overflow-hidden text-left">
                                {selectedConversation && (
                                    <h2 className="truncate text-sm font-medium text-neutral-600">Chat con {selectedConversation}</h2>
                                )}
                            </div>
                        </button>
                    </div>
                    <div className="overflow-auto">
                        {selectedConversation && conversations[selectedConversation].map((msg, index) => (
                            <div key={index} className={`p-2 flex ${msg.sender_id === parseInt(userId) ? 'justify-end' : 'justify-start'}`}>
                                <div className={`inline-block p-2 rounded shadow  ${msg.sender_id === parseInt(userId) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    {msg.content}
                                    <div className="pt-2 text-xs text-gray-600">{new Date(msg.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2">
                        <textarea
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Escribe un mensaje..."
                        />
                        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded shadow mt-2 hover:bg-blue-600">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
