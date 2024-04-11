import React, { useState } from 'react';
import Modal from '../views/Modal';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import '../styles/Modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'date-fns';

const Payment = ({ isOpen, onClose }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    document.getElementById('selectedOption').value = option;
  };

  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePayment = async () => {
    try {
      const buyer_id = localStorage.getItem('userId');
      const buyer_name = localStorage.getItem('userName'); 
  
      const response = await axios.post('http://127.0.0.1:8000/api/buy-coins', {
        buyer_id,
        buyer_name,
        amount_in_dollars: parseFloat(selectedOption),
      });

    
       const balanceResponse = await axios.post('http://127.0.0.1:8000/api/get-Balance', {
        buyer_id,
        buyer_name,
      });    
      
      const newBalance = balanceResponse.data.saldo;
      localStorage.setItem('userBalance', newBalance);
  
      Swal.fire({
        title: '¡Compra realizada!',
        text: response.data.message,
        icon: 'success',
      });
      setTimeout(() => {
      window.location.reload();
      }, 2000);
      onClose();
      setSelectedOption(0);
    } catch (error) {
      // Si hay un error, muestra un SweetAlert con el mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar la compra. Por favor, inténtalo de nuevo más tarde.',
        icon: 'error',
      });
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex">
      
      <div>
      <h2 className="text-2xl font-semibold text-center">AÑADIR FONDOS</h2>
      <div className="btn-group flex gap-2 text-gray-800 font-semibold">
        <button 
          onClick={() => handleOptionClick('5.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '5.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 5.00
        </button>
        <button 
          onClick={() => handleOptionClick('10.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '10.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 10.00
        </button>
        <button 
          onClick={() => handleOptionClick('20.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '20.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 20.00
        </button>
        <button 
          onClick={() => handleOptionClick('50.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '50.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 50.00
        </button>
        <button 
          onClick={() => handleOptionClick('100.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '100.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 100.00
        </button>
        <button 
          onClick={() => handleOptionClick('200.00')}
          className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '200.00' ? 'bg-[#C1E6FF]' : ''}`}
        >
          GTQ 200.00
        </button>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2 text-lg bg-neutral-100 p-2 rounded-sm">
        <label className='font-semibold'> TU IMPORTE </label>
        <input  
            className="border  rounded-lg p-2 bbg-[#FFF6E9]"
            type="text" 
            id="selectedOption" 
            value={selectedOption} 
            onChange={handleInputChange}
        />
      </div>
    </div>
      <MDBContainer fluid className="py-5 gradient-custom">
        <MDBRow className="d-flex justify-content-center py-5 w-full">
          <MDBCol >
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <MDBRow className="flex flex-col justify-center items-center">
                    <p className='text-sm font-semibold'>Número de Tarjeta</p>
                    <MDBInput
                      className='px-2 rounded-lg border'
                      id="form1"
                      type="text"
                      placeholder="1234 5678 9012 3457"
                    />
                    <p className='text-sm font-semibold'>Nombre</p>
                    <MDBInput
                      className='px-2 rounded-lg border'
                      id="form2"
                      type="text"
                      placeholder="Cardholder's Name"
                    />
                    <p className='text-sm font-semibold'>Fecha de Expiración</p>
                    <MDBInput
                      className='px-2 rounded-lg border'
                      id="form2"
                      type="text"
                      placeholder="MM/YYYY"
                    />
                    <p className='text-sm font-semibold'>CVV</p>
                    <MDBInput
                      className='px-2 rounded-lg border'
                      id="form2"
                      type="text"
                      placeholder="&#9679;&#9679;&#9679;"
                    />
                  <MDBCol size="3">
                    <MDBBtn color="info" rounded size="lg" className='bg-green-400 px-4 py-2 rounded-lg text-white font-semibold w-full mt-2'
                    onClick={handlePayment}
                    >
                      Pagar GTQ{selectedOption}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Modal>
  );
};

export default Payment;
