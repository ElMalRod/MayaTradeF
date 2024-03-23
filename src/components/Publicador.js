import React, { useState } from 'react';
import axios from 'axios';

const Publicador = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

      const response = await axios.post('http://127.0.0.1:8000/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto publicado:', response.data);
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al publicar el producto:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
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
          required
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
