import React, { useState } from 'react';
import Modal from '../views/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const MensajeDirectoModal = ({ isOpen, onClose, recipientName, productName }) => {
    const [message, setMessage] = useState(`Hola, estoy interesado en "${productName}".`);

    const sendMessage = () => {
        const senderName = localStorage.getItem('userName'); // Suponiendo que el nombre del usuario está guardado aquí
        if (!senderName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe iniciar sesión para enviar mensajes!',
            });
            return;
        }

        axios.post('http://localhost:8000/api/send-message', {
            sender_name: senderName,
            recipient_name: recipientName,
            content: message
        }).then(response => {
            Swal.fire('Enviado!', 'Tu mensaje ha sido enviado.', 'success');
            onClose(); // Cerrar el modal después de enviar
        }).catch(error => {
            console.error('Error al enviar mensaje:', error);
            Swal.fire('Error!', 'No se pudo enviar el mensaje.', 'error');
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <div>
                <h2 className="text-2xl font-semibold text-center">Enviar Mensaje Directo</h2>
                <textarea
                    className="w-full p-2 border rounded my-4"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows="4"
                />
                <button onClick={sendMessage} className='bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold w-full'>Enviar</button>
            </div>
        </Modal>
    );
};

export default MensajeDirectoModal;
