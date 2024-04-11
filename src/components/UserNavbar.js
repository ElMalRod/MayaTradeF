import React, { useState } from 'react';
import logo from "../assets/1.png";
import { FaFileAlt, FaFolder, FaUserFriends } from 'react-icons/fa';
import Modal from "../views/Modal";
import PaymentModal from "../components/Payment";
import PaymentsIcon from '@mui/icons-material/Payments';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SyncAltIcon from '@mui/icons-material/SyncAlt';


function UserNavbar() {
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

  const navigateToSellSection = () => {
    // Implementar navegación a la sección de venta
  };

  const navigateToBarterSection = () => {
    // Implementar navegación a la sección de trueque
  };

  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">
      {/* Logo */}
      <div className="bg-blue-100n grid place-content-center p-4 cursor-pointer">
        <img src={logo} alt="Logo" width={150} height={150} />
      </div>

      {/* Sección de Compra */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToBuySection}>
        <PaymentsIcon className="text-gray-600" />
        <p className="pl-2"> Depositar </p>
      </div>

      {/* Sección de Venta */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToSellSection}>
        <StorefrontIcon className="text-gray-600" />
        <p className="pl-2"> Publicaciones</p>
      </div>

      {/* Sección de Trueque */}
      <div className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4" onClick={navigateToBarterSection}>
        <SyncAltIcon className="text-gray-600" />
        <p className="pl-2"> Voluntariado</p>
      </div>

      {/* Modal de Pago */}
      <Modal isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose}>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={handlePaymentModalClose} />
      </Modal>
    </div>
  );
}

export default UserNavbar;
