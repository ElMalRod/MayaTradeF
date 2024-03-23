import React, { useState, useEffect } from "react";

import logo from "../assets/1.png";
import { FaFileAlt, FaFolder, FaUserPlus, FaUserFriends, FaTrash } from 'react-icons/fa';

function Navbar() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  // Funciones para manejar la navegación a las secciones relevantes del sistema
  const navigateToBuySection = () => {
    // Implementar navegación a la sección de compra
  };

  const navigateToSellSection = () => {
    // Implementar navegación a la sección de venta
  };

  const navigateToBarterSection = () => {
    // Implementar navegación a la sección de trueque
  };

  // Función para manejar la navegación a la sección de administración (solo para administradores)
  const navigateToAdminSection = () => {
    // Implementar navegación a la sección de administración
  };

  // Función para manejar la navegación a la sección de usuario (para usuarios registrados)
  const navigateToUserSection = () => {
    // Implementar navegación a la sección de usuario
  };

  // Función para manejar la navegación a la sección de inicio de sesión (para visitantes no registrados)
  const navigateToLogin = () => {
    // Implementar navegación a la sección de inicio de sesión
  };

  // Función para manejar la navegación a la sección de registro (para visitantes no registrados)
  const navigateToRegister = () => {
    // Implementar navegación a la sección de registro
  };

  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">
      {/* Logo */}
      <div className="bg-blue-100n grid place-content-center p-4 cursor-pointer">
        <img src={logo} alt="Logo" width={150} height={150} />
      </div>

      {/* Sección de Compra */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToBuySection}>
        <FaFileAlt className="text-gray-600" />
        <p className="pl-2"> Compra</p>
      </div>

      {/* Sección de Venta */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToSellSection}>
        <FaFolder className="text-gray-600" />
        <p className="pl-2"> Venta</p>
      </div>

      {/* Sección de Trueque */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToBarterSection}>
        <FaUserFriends className="text-gray-600" />
        <p className="pl-2"> Trueque</p>
      </div>

      {/* Sección de Administración (solo para administradores) */}
      {userRole === 'Administrador' && (
        <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToAdminSection}>
          <FaUserPlus className="text-gray-600" />
          <p className="pl-2"> Administración</p>
        </div>
      )}

      {/* Sección de Usuario (para usuarios registrados) */}
      {userRole !== 'Administrador' && userRole !== '' && (
        <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToUserSection}>
          <FaUserFriends className="text-gray-600" />
          <p className="pl-2"> Usuario</p>
        </div>
      )}

      {/* Sección de Inicio de Sesión (para visitantes no registrados) */}
      {userRole === '' && (
        <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToLogin}>
          <FaFileAlt className="text-gray-600" />
          <p className="pl-2"> Iniciar Sesión</p>
        </div>
      )}

      {/* Sección de Registro (para visitantes no registrados) */}
      {userRole === '' && (
        <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToRegister}>
          <FaFolder className="text-gray-600" />
          <p className="pl-2"> Registro</p>
        </div>
      )}

    </div>
  );
}

export default Navbar;
