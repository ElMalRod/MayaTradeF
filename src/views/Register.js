import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from "../assets/1.png"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  const [highlightedRole, setHighlightedRole] = useState('');
  const roles = ['Administrador', 'Publicador', 'Comprador', 'Visitante'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleClick = (role) => {
    setHighlightedRole(role);
    setFormData({
      ...formData,
      role: role,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);

      if (response && response.data) {
        console.log('Registro exitoso:', response.data);

        // Use SweetAlert for success
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El usuario se ha registrado correctamente.',
        });
      } else {
        console.error('Error al registrar usuario: Respuesta sin datos');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.response.data);

      // Use SweetAlert for error
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario',
        text: error.response.data.message, 
      });
    }
  };
  
  return (
    <section className="bg-white white:bg-dark-900">
    <div className="flex justify-center min-h-screen">
      <div className="w-2/5 grid justify-items-center place-content-center bg-gray-100">
        <img src={logo} alt="Logo" width={400} height={400} />
      </div>

      <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
        <div className="w-full">
          <h1 className="text-2xl font-semibold tracking-wider text-dark-800 capitalize white:text-white">
            Registrate
          </h1>

            <div className="mt-6">
            <h1 className="text-gray-500 dark:text-dark-300">Seleccione rol</h1>
            <div className="mt-3 md:flex md:items-center md:-mx-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleClick(role)}
                  className={`flex justify-center w-full px-6 py-3 text-white ${
                    highlightedRole === role ? 'bg-blue-500' : 'bg-gray-300 hover:bg-blue-400'
                  } rounded-lg md:w-auto md:mx-2 focus:outline-none`}
                >
                  <span className="mx-2">{role}</span>
                </button>
              ))}
            </div>
          </div>
            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2 text-sm text-dark-600 dark:text-dark-200">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg dark:placeholder-dark-600 dark:bg-dark-900 dark:text-dark-300 dark:border-dark-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-dark-600 dark:text-dark-200">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johnarch@example.com"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg dark:placeholder-dark-600 dark:bg-dark-900 dark:text-dark-300 dark:border-dark-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-dark-600 dark:text-dark-200">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg dark:placeholder-dark-600 dark:bg-dark-900 dark:text-dark-300 dark:border-dark-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-dark-600 dark:text-dark-200">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirme su contraseña"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg dark:placeholder-dark-600 dark:bg-dark-900 dark:text-dark-300 dark:border-dark-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Registrar </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;