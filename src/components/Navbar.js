import React, { useState, useEffect } from "react";
import logo from "../assets/1.png";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RuleIcon from '@mui/icons-material/Rule';
import ReportIcon from '@mui/icons-material/Report';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navbar({ handleShowPubliTable, handleShowUsersTable }) {
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  const navigateToAdminUsersSection = () => {
    handleShowUsersTable(); // Mostrar tabla de usuarios
  };

  const navigateToAdminPubliSection = () => {
    handleShowPubliTable(); // Mostrar tabla de publicaciones
  };

  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">
      <div className="bg-blue-100n grid place-content-center p-4 cursor-pointer">
        <img src={logo} alt="Logo" width={150} height={150} />
      </div>

      {/* ADMINISTRAR PUBLICACIONES */}
      <div className="h-[15px] w-full border-t-2 text-sm font-semibold text-neutral-500 mx-2 flex items-center p-2">
        <ArrowRightIcon/>
        Administrar Publicaciones
      </div>

      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToAdminPubliSection}>
        <RuleIcon/>
        <p className="pl-2"> Solicitudes </p>
      </div>

      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToAdminPubliSection}>
        <ReportIcon/>
        <p className="pl-2"> Reportes</p>
      </div>

      {/* ADMINISTRAR USUARIOS */}
      <div className="h-[15px] w-full border-t-2 text-sm font-semibold text-neutral-500 mx-2 flex items-center p-2">
        <ArrowRightIcon/>
        Administrar Usuarios
      </div>

      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToAdminUsersSection}>
        <PersonAddIcon/>
        <p className="pl-2"> Solicitudes</p>
      </div>

      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToAdminUsersSection}>
        <ReportIcon/>
        <p className="pl-2"> Reportes</p>
      </div>
    </div>
  );
}

export default Navbar;
