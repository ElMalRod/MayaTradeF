import React, { useState } from 'react';
import Modal from '../views/Modal';
import '../styles/Modal.css';
import { set } from 'date-fns';

const Report = ({ isOpen, onClose, onSubmit, success }) => {
    const [reportReason, setReportReason] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setReportReason(option);
      document.getElementById('selectedOption').value = option;
    };
  
    const handleInputChange = (event) => {
      setSelectedOption(event.target.value);
        setReportReason(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(reportReason); 
      };

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex">
            <div className='text-sm grid justify-items-center w-[400px]'>
                <p className='text-gray-800 text-xl font-semibold'>REPORTAR</p>
                <div className="btn-group flex flex-col gap-2 text-gray-800 font-semibold w-full">
                    <button
                        onClick={() => handleOptionClick('No era lo que esperaba.')}
                        className={`text-red-800 bg-red-50 hover:bg-neutral-100 hover:text-gray-800 py-2 px-4 rounded-lg  ${selectedOption === 'No era lo que esperaba.' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        No era lo que esperaba.
                    </button>
                    <button
                        onClick={() => handleOptionClick('Mala Calidad')}
                        className={`text-red-800 bg-red-50 hover:bg-neutral-100 hover:text-gray-800 py-2 px-4 rounded-lg ${selectedOption === 'Mala Calidad' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        Mala Calidad
                    </button>
                    <button
                        onClick={() => handleOptionClick('Incumplimiento de condiciones')}
                        className={`text-red-800 bg-red-50 hover:bg-neutral-100 hover:text-gray-800 py-2 px-4 rounded-lg ${selectedOption === 'Incumplimiento de condiciones' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        Incumplimiento de condiciones
                    </button>
                    <button
                        onClick={() => handleOptionClick('Mal Servicio')}
                        className={`text-red-800 bg-red-50 hover:bg-neutral-100 hover:text-gray-800 py-2 px-4 rounded-lg  ${selectedOption === 'razon 4' ? 'bg-[#C1E6FF]' : ''}`}
                    >
                        Mal Servicio
                    </button>   
                </div>

                <div className="flex justify-center items-center mt-4 gap-2 text-md bg-neutral-100 p-2 rounded-sm w-full">
                    <label className='font-semibold'> Otra </label>
                    <input
                        className="border rounded-lg p-2 bbg-[#FFF6E9] w-full"
                        type="text"
                        id="selectedOption"
                        value={reportReason}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button onClick={handleSubmit} className='bg-green-400 p-2 px-4 text-white rounded-md font-semibold mr-2'>Enviar</button>
                {success && (
                  <p className="text-green-500">Reporte enviado exitosamente.</p>
                )}
        </Modal>
    );
};

export default Report;
