import React, { } from 'react';
import Navbar from '../../components/UserNavbar';
import TopNavbar from '../../components/UserTopNavbar';
import ServicesList from '../../components/ServicesList';


function PublicadorServicios() {
  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='h-[100%] overflow-auto'>
            <ServicesList />
        </div>
        <TopNavbar />
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar />
      </div>
    </div>
  );
}

export default PublicadorServicios;