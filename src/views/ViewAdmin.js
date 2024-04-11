import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TopNavbar from '../components/TopNavbar';
import UsersTable from '../components/UsersTable';
import PubliTable from '../components/PubliTable'; 

function ViewAdmin() {
  const [showUsersTable, setShowUsersTable] = useState(true); // Estado para controlar qué tabla mostrar

  const handleShowUsersTable = () => {
    setShowUsersTable(true); // Mostrar tabla de usuarios
  };

  const handleShowPubliTable = () => {
    setShowUsersTable(false); // Mostrar tabla de publicaciones
  };

  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='h-[1000000%]'>
          {showUsersTable ? <UsersTable /> : <PubliTable />} {/* Mostrar la tabla según el estado */}
        </div>
        <div className='h-[15%]'>
          {/* Footer */}
        </div>
        <TopNavbar />
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar 
          handleShowPubliTable={handleShowPubliTable} 
          handleShowUsersTable={handleShowUsersTable} 
        />
      </div>
    </div>
  );
}

export default ViewAdmin;
