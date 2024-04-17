import React, { useState } from 'react';
import Modal from '../views/Modal';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import '../styles/Modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'date-fns';

const Retiro = ({ isOpen, onClose }) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        document.getElementById('selectedOption').value = option;
    };

    const handleInputChange = (event) => {
        setSelectedOption(event.target.value);
    };



    const handleWithdraw = async () => {
        const userName = localStorage.getItem('userName');
        if (!userName) {
            Swal.fire("Autenticacion requerida", "Por favor inicie sesión para continuar.", "warning");
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/withdraw', {
                userName,
                amount: parseFloat(selectedOption),
            });
    
            Swal.fire({
                title: 'Retiro exitoso',
                text: `Has retirado exitosamente Q.${selectedOption}`,
                icon: 'success',
            });
            
            // Update balance in localStorage
            localStorage.setItem('userBalance', response.data.balance);
            onClose();
            setSelectedOption('');
            setTimeout(() => {
                window.location.reload();
            } , 2000);
        } catch (error) {
            Swal.fire({
                title: 'Retiro fallido',
                text: error.response?.data?.error || "Se produjo un error, inténtelo nuevamente más tarde.",
                icon: 'error',
            });
        }
    };
    

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex">

            <div className='flex flex-col items-center'>
                <h2 className="text-2xl font-semibold text-center">RETIRAR FONDOS</h2>
                <div className="btn-group grid grid-cols-3 gap-2 text-gray-800 font-semibold">
                    <button
                        onClick={() => handleOptionClick('5.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '5.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 5.00
                    </button>
                    <button
                        onClick={() => handleOptionClick('10.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '10.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 10.00
                    </button>
                    <button
                        onClick={() => handleOptionClick('20.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '20.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 20.00
                    </button>
                    <button
                        onClick={() => handleOptionClick('50.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '50.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 50.00
                    </button>
                    <button
                        onClick={() => handleOptionClick('100.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '100.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 100.00
                    </button>
                    <button
                        onClick={() => handleOptionClick('200.00')}
                        className={`bg-white hover:bg-[#C1E6FF] py-2 px-4 rounded-lg border border-[#40A2E3] ${selectedOption === '200.00' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        MAYAN COIN 200.00
                    </button>
                </div>
                <div className="flex justify-center items-center mt-4 gap-2 text-lg bg-neutral-100 p-2 rounded-sm w-full">
                    <label className='font-semibold'> OTRO </label>
                    <input
                        className="border  rounded-lg p-2 bbg-[#FFF6E9]"
                        type="text"
                        id="selectedOption"
                        value={selectedOption}
                        onChange={handleInputChange}
                    />
                </div>
                <div color="info" rounded size="lg" className='bg-green-400 px-4 py-2 rounded-lg text-white text-center font-semibold w-[300px] mt-2'  >
                    <button onClick={handleWithdraw} className='text-white font-semibold'>Retirar</button>
                </div>
            </div>
        </Modal>
    );
};

export default Retiro;
