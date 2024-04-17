import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const TablePublicReport = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const [reportedServices, setReportedServices] = useState([]);

    useEffect(() => {
        // Hacer la solicitud GET para obtener la lista de productos reportados
        axios.get('http://127.0.0.1:8000/api/products/reported')
            .then(response => {
                const productosConType = response.data.reported_products.map(producto => ({
                    ...producto,
                    type: 'product' // Agregar el tipo 'product' a cada producto
                }));
                setReportedProducts(productosConType);
            })
            .catch(error => {
                console.error('Error fetching reported products:', error);
            });

        // Hacer la solicitud GET para obtener la lista de servicios reportados
        axios.get('http://127.0.0.1:8000/api/services/reported')
            .then(response => {
                const serviciosConType = response.data.reported_services.map(servicio => ({
                    ...servicio,
                    type: 'service' // Agregar el tipo 'service' a cada servicio
                }));
                setReportedServices(serviciosConType);
            })
            .catch(error => {
                console.error('Error fetching reported services:', error);
            });

    }, []);
    

    const handleApproval = (id, type) => {
        const url = `http://127.0.0.1:8000/api/${type === 'product' ? 'products' : 'services'}/${id}/approve`;

        axios.put(url)
            .then(response => {
                // Actualizar el estado después de la aprobación
            })
            .catch(error => {
                console.error('Error approving publication:', error);
            });
    };

    const handleDenial = (id, type) => {
        const url = `http://127.0.0.1:8000/api/${type === 'product' ? 'products' : 'services'}/${id}`;

        
        axios.delete(url)
            .then(response => {
                if (type === 'product') {
                    setReportedProducts(prevProducts =>
                        prevProducts.filter(product => product.id !== id)
                    );
                } else if (type === 'service') {
                    setReportedServices(prevServices =>
                        prevServices.filter(service => service.id !== id)
                    );
                }
            })
            .catch(error => {
                console.error('Error deleting publication:', error);
            });
    };

    const allPublications = [...reportedProducts, ...reportedServices];

    return (
        <div>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Publicaciones Reportadas</h2>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Usuario</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Publicación</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">Mensaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allPublications.map(publication => (
                                        <tr key={publication.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">{publication.userName}</p>
                                                        <p className="text-gray-600 whitespace-no-wrap">{publication.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{publication.name}</p>
                                                <p className="text-gray-600 whitespace-no-wrap">{publication.description}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{publication.price}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span className={`relative inline-block px-3 py-1 font-semibold ${publication.reported ? 'text-red-900 bg-red-200' : 'text-green-900 bg-green-200'} rounded-full`}>
                                                    {publication.reported ? 'Reportado' : 'Aprobado'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button className="text-green-900 hover:text-green-500 whitespace-no-wrap" onClick={() => handleApproval(publication.id, publication.type)}>
                                                    <CheckCircleOutlineIcon />
                                                </button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button className="text-red-800 hover:text-red-600 whitespace-no-wrap" onClick={() => handleDenial(publication.id, publication.type)}>
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg text-right">
                                                <p className="text-gray-500 hover:text-gray-700 cursor-pointer">{publication.report_reason}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablePublicReport;
