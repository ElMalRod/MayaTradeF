import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Hacer la solicitud GET para obtener la lista de usuarios
        axios.get('http://127.0.0.1:8000/api/users/approval-status')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('Error al recuperar usuarios:', error);
            });
    }, []); 


    const handleApproval = (userId) => {
        // Hacer la solicitud POST para aprobar al usuario con el ID dado
        axios.put(`http://127.0.0.1:8000/api/users/${userId}/approval-status`, { approved: 1 })
            .then(response => {
                // Actualizar el estado de los usuarios después de la aprobación
                setUsers(users.map(user => user.id === userId ? response.data.user : user));
            })
            .catch(error => {
                console.error('Error al aprobar usuario:', error);
            });
    };

    const handleDenial = (userId) => {
        // Hacer la solicitud POST para denegar al usuario con el ID dado
        axios.put(`http://127.0.0.1:8000/api/users/${userId}/approval-status`, { approved: 0 })
            .then(response => {
                // Actualizar el estado de los usuarios después de la denegación
                setUsers(users.map(user => user.id === userId ? response.data.user : user));
            })
            .catch(error => {
                console.error('Error al negar al usuario:', error);
            });
    };

    return (
        <div>
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Aprobar Usuarios</h2>
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
                                            Saldo
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            Creado
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
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                    <tr key={user.id}>
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
                                                        {user.name}
                                                    </p>
                                                    <p class="text-gray-600 whitespace-no-wrap">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">Q. {user.saldo}</p>
                                            <p class="text-gray-600 whitespace-no-wrap">GTQ</p>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                                {user.created_at}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {user.approved ? (
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">Aprobado</span>
                                                </span>
                                            ) : (
                                                <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                                    <span aria-hidden className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">Pendiente</span>
                                                </span>
                                            )}
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                            <button class="text-green-900 hover:text-green-500 whitespace-no-wrap" 
                                                onClick={() => handleApproval(user.id)}
                                            >
                                                <CheckCircleOutlineIcon />
                                            </button>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                            <button class="text-red-800 hover:text-red-600 whitespace-no-wrap"
                                                onClick={() => handleDenial(user.id)}
                                            >
                                                <RemoveCircleOutlineIcon />
                                            </button>
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-lg">
                                            <button class="text-blue-900 hover:text-blue-500 whitespace-no-wrap">
                                                <EditNoteIcon />
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

export default UsersTable;
