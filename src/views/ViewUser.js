import React, { } from 'react';

import Navbar from '../components/UserNavbar';
import TopNavbar from '../components/UserTopNavbar';
import Publicador from '../components/Publicador';
import PublicacionesList from '../components/PublicacionesList';


function ViewUser() {
  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
    <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='h-[1000000%]'>
            {/* Contenido */}
            <Publicador />
            <PublicacionesList />
        </div>
        <div className='h-[15%]'>
            {/* Footer */}
        </div>
     <TopNavbar />
     
    </div>
    <div className='w-[15%] bg-[#F6F5F5]'>
      <Navbar />
    </div>
  </div>
  );
}

export default ViewUser;