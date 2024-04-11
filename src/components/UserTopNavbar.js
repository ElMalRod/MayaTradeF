import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaUserCircle, FaLock, FaPowerOff } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Modal from "../views/Modal";
import Alert from "@material-ui/lab/Alert";
import mayacoinImage from "../assets/mayacoin.png";

const UserTopNavbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isWrongPasswordAlertVisible, setWrongPasswordAlertVisible] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isChangingPassword, setChangingPassword] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    setUsername(storedUsername);

    const userBalance = localStorage.getItem('userBalance');
    setUserBalance(parseFloat(userBalance) || 0); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userBalance');

    window.location.href = '/';
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleChangePassword = async () => {
  
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div className="bg-[#F6F5F5] flex items-center justify-between z-400">
      <form className="flex items-center w-[500px] h-[20px] p-8 pl-4">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="simple-search" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1" placeholder="Buscar producto..." required />
        </div>
        <button type="submit" className="p-1.5 ml-2 text-sm font-medium text-white bg-[#4592AF] rounded-lg border border-[#4592AF] hover:bg-teal-500">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="flex items-center gap-2 text-xl text-gray-500 z-400">
      <p>{localStorage.getItem('userName')}</p>
      <div className="flex items-center">
          <img src={mayacoinImage} alt="MayaCoin" className="w-6 h-6 mr-1" /> {/* Mostrar la imagen de la moneda */}
          <p>{userBalance}</p> {/* Mostrar el saldo del usuario */}
        </div>
        <div className="text-3xl pr-4">
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FaUserCircle className="text-3xl " />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="text-gray-700">
                      <MenuItem onClick={() => setOpenModal(true)} className="flex gap-2">
                        <FaLock />
                        Cambiar contraseña
                      </MenuItem>

                      <MenuItem onClick={handleLogout} className="flex gap-2">
                        <FaPowerOff />Cerrar Sesión
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} className="flex" >
        {/* Contenido del Modal */}
        <form className="grid grid-cols-1 h-[200px] place-content-center gap-2 text-gray-600">
          <h1 className="text-xl font-bold">Cambiar contraseña</h1>
          <label>
            Contraseña actual:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border ml-2"
            />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border ml-2"
            />
          </label>
          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="mt-2 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleChangePassword()}
              className="mt-2 bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              Confirmar
            </button>
          </div>
          {isAlertVisible && (
            <Alert severity="success" onClose={() => setAlertVisible(false)}>
              Contraseña cambiada correctamente
            </Alert>
          )}
          {isWrongPasswordAlertVisible && (
            <Alert severity="error" onClose={() => setWrongPasswordAlertVisible(false)}>
              Contraseña actual incorrecta
            </Alert>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default UserTopNavbar;