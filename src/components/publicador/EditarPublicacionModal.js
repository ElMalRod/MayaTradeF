import React, { useState } from 'react';
import Modal from '../../views/Modal';
import '../../styles/Modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditarPublicacionModal = ({ isOpen, onClose, productId, serviceId, type }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = type === 'product' ? `http://127.0.0.1:8000/api/products/update/${productId}` : `http://127.0.0.1:8000/api/services/update/${serviceId}`;

    axios.put(url, formData)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // Mostrar un mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La publicación se actualizó correctamente.',
        });
        // Cerrar el modal después de actualizar
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al actualizar la publicación:', error);
        // Mostrar un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar la publicación. Por favor, intenta de nuevo más tarde.',
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex">
      Editar Publicación
      <form onSubmit={handleSubmit} className="w-[500px] flex flex-col justify-center">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre" required />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Descripción" required />
        </div>
        <div className="mb-5">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Q." required />
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Guardar</button>
      </form>
    </Modal>
  );
};

export default EditarPublicacionModal;
