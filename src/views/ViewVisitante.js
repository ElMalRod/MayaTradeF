import React, { } from 'react';
import VisitanteNavbar from '../components/VisitanteNavbar';
import TopNavbar from '../components/UserTopNavbar';
import PublicacionesList from '../components/PublicacionesList';


function ViewVisitante() {
  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
    <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='h-[100%] overflow-auto'>
            {/* Contenido */}
            <PublicacionesList />
        </div>
     <TopNavbar />
    </div>
    <div className='w-[15%] bg-[#F6F5F5]'>
      <VisitanteNavbar />
    </div>
  </div>
  );
}

export default ViewVisitante;