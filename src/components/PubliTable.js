import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';

const PubliTable = () => {
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        // Hacer la solicitud GET para obtener la lista de productos
        axios.get('http://127.0.0.1:8000/api/products')
            .then(response => {
                const productosConType = response.data.products.map(producto => ({
                    ...producto,
                    type: 'product' // Agregar el tipo 'product' a cada producto
                }));
                setProductos(productosConType);
            })
            .catch(error => {
                console.error('Error al recuperar productos:', error);
            });
    
        // Hacer la solicitud GET para obtener la lista de servicios
        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => {
                const serviciosConType = response.data.services.map(servicio => ({
                    ...servicio,
                    type: 'service' // Agregar el tipo 'service' a cada servicio
                }));
                setServicios(serviciosConType);
            })
            .catch(error => {
                console.error('Error al recuperar servicios:', error);
            });
    }, []);
    


    const handleApproval = (productId, type) => {
        const url = `http://127.0.0.1:8000/api/${type === 'product' ? 'products' : 'services'}/${productId}/approve`;
    
        axios.put(url)
            .then(response => {
                updateState(productId, type, true);
            })
            .catch(error => {
                console.error('Error al aprobar la publicación:', error);
            });
    };
    
    const handleDenial = (productId, type) => {
        console.log('Denying:', productId, type);
        const url = `http://127.0.0.1:8000/api/${type === 'product' ? 'products' : 'services'}/${productId}/reject`;
    
        axios.put(url)
            .then(response => {
                updateState(productId, type, false);
            })
            .catch(error => {
                console.error('Error al rechazar la publicación:', error);
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

    return (
        <div>
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Aprobar Publicaciones</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Usuario
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Publicación
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Precio
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Estado
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {publicaciones.map(publicacion => (
                                    <tr key = {publicacion.id}>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div class="flex">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        class="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {publicacion.userName}
                                                    </p>
                                                    <p class="text-gray-600 whitespace-no-wrap">{publicacion.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {publicacion.name}
                                            </p>
                                            <p class="text-gray-600 whitespace-no-wrap">
                                                {publicacion.description}
                                            </p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {publicacion.price}
                                            </p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                class={`relative inline-block px-3 py-1 font-semibold ${
                                                    publicacion.approved ? 'text-green-900' : 'text-orange-900'
                                                } leading-tight`}
                                            >
                                                <span
                                                    aria-hidden
                                                    class={`absolute inset-0 ${
                                                        publicacion.approved ? 'bg-green-200' : 'bg-orange-200'
                                                    } opacity-50 rounded-full`}
                                                ></span>
                                                <span class="relative">{publicacion.approved ? 'Aprobada' : 'Pendiente'}</span>
                                            </span>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button
                                                    class="text-green-900 hover:text-green-500 whitespace-no-wrap"
                                                    onClick={() => handleApproval(publicacion.id, publicacion.type)}
                                                >
                                                    <CheckCircleOutlineIcon />
                                                </button>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                                <button
                                                class="text-red-800 hover:text-red-600 whitespace-no-wrap"
                                                onClick={() => handleDenial(publicacion.id, publicacion.type)}
                                            >
                                                <RemoveCircleOutlineIcon />
                                            </button>

                                        </td>
                                        <td
                                            class="px-5 py-5 border-b border-gray-200 bg-white text-lg text-right"
                                        >
                                            <button
                                                type="button"
                                                class="inline-block text-gray-500 hover:text-gray-700"
                                            >
                                                <svg
                                                    class="inline-block h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                        
                                        {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                                            >
                                                <span
                                                    aria-hidden
                                                    class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                                                ></span>
                                                <span class="relative">Pending</span>
                                            </span>
                                        </td>
                                        <td class="px-5 py-5 bg-white text-sm">
                                            <span
                                                class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                            >
                                                <span
                                                    aria-hidden
                                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                ></span>
                                                <span class="relative">Overdue</span>
                                            </span>
                                        </td>
                                        */}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div></div>
    );
};

export default PubliTable;
