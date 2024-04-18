import React, { useState } from 'react';
import VisitanteNavbar from '../../components/VisitanteNavbar';
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
            <VoluntariadoList />
        </div>
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <VisitanteNavbar />
      </div>
    </div>
  );
}

export default Voluntariado;
