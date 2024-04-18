import React, { } from 'react';
import CompradorNavbar from '../components/CompradorNavbar';
import TopNavbar from '../components/UserTopNavbar';
import Publicador from '../components/Publicador';
import PublicacionesList from '../components/PublicacionesList';


function ViewComprador() {
  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
    <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='h-[100%] overflow-auto'>
            <PublicacionesList />
        </div>
     <TopNavbar />
    </div>
    <div className='w-[15%] bg-[#F6F5F5]'>
      <CompradorNavbar />
    </div>
  </div>
  );
}

export default ViewComprador;