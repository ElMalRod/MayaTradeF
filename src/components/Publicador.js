// Publicador.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Publicador = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    tipo: '', 
    approved: 1,
    available: 1, 
    active: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'approved' || name === 'available' ? e.target.checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = localStorage.getItem('userName');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('userName', userName);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('tipo', formData.tipo); 
      formDataToSend.append('approved', formData.approved); 
      formDataToSend.append('available', formData.available);
      formDataToSend.append('active', formData.active); 

      const endpoint = formData.tipo === 'servicio' ? 'services' : 'products';

      const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto publicado:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Producto publicado',
        text: 'Tu producto ha sido publicado con éxito',
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 2000); 

    } catch (error) {
      console.error('Error al publicar el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al publicar el producto',
        text: 'Ocurrió un error al publicar tu producto',
      });

    }
   
  };

  return (
    <div className="bg-red-300 rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="¿Qué estás publicando?"
            className="w-full border-none focus:outline-none"
            required
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe tu producto..."
          className="w-full mt-2 border-none focus:outline-none resize-none"
          required
        />
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full mt-2 border-none focus:outline-none"
          required
        >
          <option value="">Selecciona tipo</option>
          <option value="servicio">Servicio</option>
          <option value="producto">Producto</option>
        </select>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio en MQ"
          className="w-full mt-2 border-none focus:outline-none"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mt-2 border-none focus:outline-none"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default Publicador;
