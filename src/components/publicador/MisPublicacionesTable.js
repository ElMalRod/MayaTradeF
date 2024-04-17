// src/components/publicador/MisPublicacionesTable.js

import React, { useState, useEffect } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Modal from '../../views/Modal';
import EditarPublicacionModal from './EditarPublicacionModal';
import axios from 'axios';
import Swal from 'sweetalert2';

function MisPublicacionesTable() {
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [userName, setUserName] = useState('');
    const [editProductId, setEditProductId] = useState(null); // ID del producto en edición
    const [editServiceId, setEditServiceId] = useState(null); // ID del servicio en edición
    const [editType, setEditType] = useState(null); // Tipo de la publicación en edición
    const [isEditarPublicacionModalOpen, setIsEditarPublicacionModalOpen] = useState(false);

    useEffect(() => {
        // Obtener el nombre de usuario del localStorage
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);

        // Hacer la solicitud GET para obtener la lista de productos del usuario
        axios.get(`http://127.0.0.1:8000/api/users/${storedUserName}/products`)
            .then(response => {
                const productosConType = response.data.products.map(producto => ({
                    ...producto,
                    type: 'product'
                }));
                setProductos(productosConType);
            })
            .catch(error => {
                console.error('Error fetching productos:', error);
            });

        // Hacer la solicitud GET para obtener la lista de servicios del usuario
        axios.get(`http://127.0.0.1:8000/api/users/${storedUserName}/services`)
            .then(response => {
                const serviciosData = response.data.services;
                if (serviciosData && Array.isArray(serviciosData)) { // Verificar si serviciosData existe y es un array
                    const serviciosConType = serviciosData.map(servicio => ({
                        ...servicio,
                        type: 'service'
                    }));
                    setServicios(serviciosConType);
                } else {
                    console.error('Error fetching servicios: Data incorrecta');
                    setServicios([]); // Establecer servicios como un array vacío
                }
            })
            .catch(error => {
                console.error('Error fetching servicios:', error);
            });
    }, []);

    const handleDenial = (productId, type) => {
        // Mostrar Sweet Alert
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminada, no podrás recuperar esta publicación.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, eliminar la publicación
                const url = `http://127.0.0.1:8000/api/${type === 'product' ? 'products' : 'services'}/${productId}`;
                axios.delete(url)
                    .then(response => {
                        // Actualizar el estado de la lista de publicaciones
                        updateState(productId, type, false);
                        // Mostrar mensaje de éxito
                        Swal.fire(
                            '¡Eliminado!',
                            'La publicación ha sido eliminada.',
                            'success'
                        );
                        setTimeout(() => {
                        window.location.reload();
                        } , 2000);
                    })
                    .catch(error => {
                        console.error('Error al eliminar la publicación:', error);
                        // Mostrar mensaje de error
                        Swal.fire(
                            'Error',
                            'Hubo un problema al eliminar la publicación. Por favor, inténtalo de nuevo más tarde.',
                            'error'
                        );
                    });
            }
        });
    };
    

    const updateState = (productId, type, approved) => {
        if (type === 'product') {
            const updatedProductos = productos.map(producto => {
                if (producto.id === productId) {
                    return { ...producto, approved };
                }
                return producto;
            });
            setProductos(updatedProductos);
        } else {
            const updatedServicios = servicios.map(servicio => {
                if (servicio.id === productId) {
                    return { ...servicio, approved };
                }
                return servicio;
            });
            setServicios(updatedServicios);
        }
    };

    const publicaciones = [...productos, ...servicios];

    const handleEditarPublicacionModalOpen = (productId, serviceId, type) => {
        setIsEditarPublicacionModalOpen(true);
        setEditProductId(productId);
        setEditServiceId(serviceId);
        setEditType(type);
    };

    const handleEditarPublicacionModalClose = () => {
        setIsEditarPublicacionModalOpen(false);
        setEditProductId(null);
        setEditServiceId(null);
        setEditType(null);
    };

    return (
        <div>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">{userName}'s Publicaciones</h2>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Publicación
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Precio
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Disponibilidad
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {publicaciones.map(publicacion => (
                                        <tr key={publicacion.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {publicacion.name}
                                                </p>
                                                <p className="text-gray-600 whitespace-no-wrap">
                                                    {publicacion.description}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {publicacion.price}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className={`relative inline-block px-3 py-1 font-semibold ${publicacion.available ? 'text-green-900' : 'text-orange-900'
                                                        } leading-tight`}
                                                >
                                                    <span
                                                        aria-hidden
                                                        className={`absolute inset-0 ${publicacion.available ? 'bg-green-200' : 'bg-orange-200'
                                                            } opacity-50 rounded-full`}
                                                    ></span>
                                                    <span className="relative">{publicacion.available ? 'Disponible' : 'Vendida'}</span>
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button
                                                    className="text-green-900 hover:text-green-500 whitespace-no-wrap"
                                                    onClick={() => handleEditarPublicacionModalOpen(publicacion.id, publicacion.type === 'service' ? publicacion.id : null, publicacion.type)}
                                                >
                                                    <EditNoteIcon />
                                                </button>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button
                                                    className="text-red-800 hover:text-red-600 whitespace-no-wrap"
                                                    onClick={() => handleDenial(publicacion.id, publicacion.type)}
                                                >
                                                    <RemoveCircleOutlineIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal editar*/}
            <Modal isOpen={isEditarPublicacionModalOpen} onClose={handleEditarPublicacionModalClose}>
                <EditarPublicacionModal
                    isOpen={isEditarPublicacionModalOpen}
                    onClose={handleEditarPublicacionModalClose}
                    productId={editProductId}
                    serviceId={editServiceId}
                    type={editType}
                />
            </Modal>
        </div>
    );
}

export default MisPublicacionesTable;
