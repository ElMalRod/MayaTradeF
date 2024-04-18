import React, { useState } from 'react';
import logo from "../assets/1.png";
import Modal from "../views/Modal";
import PaymentModal from "./Payment";
import PaymentsIcon from '@mui/icons-material/Payments';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CategoryIcon from '@mui/icons-material/Category';
import EngineeringIcon from '@mui/icons-material/Engineering';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PreviewIcon from '@mui/icons-material/Preview';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Retiro from './Retiro';

function VisitanteNavbar({handleShowProducts}) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePaymentModalOpen = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const navigateToBuySection = () => {
    handlePaymentModalOpen();
  };

  //retiro modal
  const [isRetiroModalOpen, setIsRetiroModalOpen] = useState(false);

  const handleRetiroModalOpen = () => {
    setIsRetiroModalOpen(true);
  };

  const handleRetiroModalClose = () => {
    setIsRetiroModalOpen(false);
  };

  const navigateToRetiroSection = () => {
    handleRetiroModalOpen();
  };

  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">
      {/* Logo */}
      <a className="bg-blue-100n grid place-content-center p-4 cursor-pointer" href='/visitante'>
        <img src={logo} alt="Logo" width={150} height={150} />
      </a>

      {/* Sección de Compra */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToBuySection}>
        <PaymentsIcon className="text-gray-600" />
        <p className="pl-2"> Depositar </p>
      </div>

      {/* PUBLICACIONES */}
      <div className="h-[15px] w-full border-t-2 text-sm font-semibold text-neutral-500 mx-2 flex items-center p-2">
        <ArrowRightIcon />
        Publicaciones
      </div>

      <a className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" href='/visitante/productos'>
        <CategoryIcon className="text-gray-600" />
        <p className="pl-2"> Productos </p>
      </a>

      <a className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" href='/visitante/servicios'>
        <EngineeringIcon className="text-gray-600" />
        <p className="pl-2"> Servicios</p>
      </a>

      <a className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" href='/visitante/voluntariado'>
        <VolunteerActivismIcon className="text-gray-600" />
        <p className="pl-2"> Voluntariado</p>
      </a>

      {/* Modal de Pago */}
      <Modal isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose}>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose} />
      </Modal>

      {/* Modal de Retiro */}
      <Modal isOpen={isRetiroModalOpen} onClose={handleRetiroModalClose}>
        <Retiro isOpen={isRetiroModalOpen} onClose={handleRetiroModalClose} />
      </Modal>
    </div>
  );
}

export default VisitanteNavbar;
