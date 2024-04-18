import React, { useState } from 'react';
import Navbar from '../../components/UserNavbar';
import TopNavbar from '../../components/UserTopNavbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import VoluntariadoList from '../../components/VoluntariadoList';
import PublicacionesList from '../../components/PublicacionesList';

function Voluntariado() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    compensation_type: '',
    compensation_value: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('userName', localStorage.getItem('userName')); // Assuming 'userName' is stored in localStorage
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('compensation_type', formData.compensation_type);
    formDataToSend.append('compensation_value', formData.compensation_value);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/volunteering', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire('Success', '¡Voluntariado publicado con éxito!', 'success');
    } catch (error) {
      console.error('No se pudo publicar el voluntariado:', error);
      Swal.fire('Error', 'No se pudo publicar el voluntariado.', 'error');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-white flex flex-col'>
        <TopNavbar />
        <div className='flex-grow p-4 overflow-auto'>
          <h2 className="text-2xl font-bold mb-4">Publicar una oportunidad de voluntariado</h2>
          <form onSubmit={handleSubmit} className=" rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Título de la oportunidad"
                className="w-full border-none focus:outline-none"
                required
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe la oportunidad de voluntariado..."
              className="w-full mt-2 border-none focus:outline-none resize-none"
              required
            />
            <select
              name="compensation_type"
              value={formData.compensation_type}
              onChange={handleInputChange}
              className="w-full mt-2 border-none focus:outline-none"
              required
            >
              <option value="">Seleccione el tipo de compensación</option>
              <option value="currency">Divisa</option>
              <option value="product">Producto</option>
              <option value="credit">Crédito</option>
            </select>
            <input
              type="number"
              name="compensation_value"
              value={formData.compensation_value}
              onChange={handleInputChange}
              placeholder="Valor de compensación"
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
        <div className='flex-grow p-4 overflow-auto'>
            <VoluntariadoList />
        </div>
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar />
      </div>
    </div>
  );
}

export default Voluntariado;
