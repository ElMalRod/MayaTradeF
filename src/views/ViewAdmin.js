import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TopNavbar from '../components/TopNavbar';
import UsersTable from '../components/UsersTable';
import PubliTable from '../components/PubliTable'; 
import TablePublicReport from '../components/TablePublicReport';

function ViewAdmin() {
  const [showUsersTable, setShowUsersTable] = useState(true); // Estado para controlar qué tabla mostrar
  const [showReportedTable, setShowReportedTable] = useState(false); // Estado para controlar la visualización de la tabla de reportes

  const handleShowUsersTable = () => {
    setShowUsersTable(true); // Mostrar tabla de usuarios
    setShowReportedTable(false); // Ocultar tabla de reportes
  };

  const handleShowPubliTable = () => {
    setShowUsersTable(false); // Mostrar tabla de publicaciones
    setShowReportedTable(false); // Ocultar tabla de reportes
  };

  const handleShowReportedTable = () => {
    setShowUsersTable(false); // Ocultar tabla de usuarios
    setShowReportedTable(true); // Mostrar tabla de reportes
  };

  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-[white] flex flex-col-reverse'>
      <div className='h-[100%] overflow-auto'>
          {showUsersTable ? <UsersTable /> : showReportedTable ? <TablePublicReport /> : <PubliTable />} {/* Mostrar la tabla según el estado */}
        </div>
        <TopNavbar />
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar 
          handleShowPubliTable={handleShowPubliTable} 
          handleShowUsersTable={handleShowUsersTable}
          handleShowReportedTable={handleShowReportedTable} 
        />
      </div>
    </div>
  );
}

export default ViewAdmin;
