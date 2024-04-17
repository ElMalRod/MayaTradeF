import React, { useState } from "react";
import {
  FaEllipsisV,
} from "react-icons/fa";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ForumIcon from '@mui/icons-material/Forum';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Report from "./Report";
import Modal from "../views/Modal";
import axios from "axios";
import MensajeDirectoModal from "./MensajeDirectoModal";
import Swal from "sweetalert2";
import { set } from "date-fns";


const PublicacionComponent = ({ type, product }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = React.useRef(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const currentUser = localStorage.getItem('userName'); 
  
  const handleReportModalOpen = () => {
    setIsReportModalOpen(true);
  };

  const handleReportModalClose = () => {
    setIsReportModalOpen(false);
  };

  const navigateToReportSection = () => {
    handleReportModalOpen();
  };

  const handleToggleMenu = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = (reason) => {
    // Enviar el reporte al backend usando Axios
    const reportData = {
      report_reason: reason
    };

    const url = `http://127.0.0.1:8000/api/${type.toLowerCase()}s/${product.id}/report`;

    axios.post(url, reportData)
      .then(response => {
        console.log("Report submitted successfully:", response.data);
        setReportSuccess(true);
        setIsReportModalOpen(false);
      })
      .catch(error => {
        console.error("Error submitting report:", error);
        // Manejar errores
      });
  };

  //modal mensaje directo
  const [isMensajeDirectoModalOpen, setIsMensajeDirectoModalOpen] = useState(false);

  const handleMensajeDirectoModalOpen = () => {
    if (currentUser === product.userName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes enviarte mensajes a ti mismo!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido'
      });
    } else {
      setIsMensajeDirectoModalOpen(true);
    }
  };

  const handleMensajeDirectoModalClose = () => {
    setIsMensajeDirectoModalOpen(false);
  };

  const navigateToMDSection = () => {
    handleMensajeDirectoModalOpen();
  };

  const updateLocalBalance = () => {
    axios.get(`http://127.0.0.1:8000/api/users/balance?userName=${currentUser}`)
      .then(response => {
        const { balance } = response.data;
        localStorage.setItem('userBalance', balance);  // Assume 'userBalance' is your key for storing user balance
        Swal.fire("Balance Updated", `Your new balance is $${balance}`, "success");
      })
      .catch(error => {
        console.error('Error fetching new balance:', error);
        Swal.fire("Balance Update Failed", "Could not update your balance at this time.", "error");
      });
  };

  const handleBuyProduct = async (productId) => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert("Usuario no identificado. Por favor, inicie sesión.");
        return;
    }

    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/products/${productId}/buy`, { userName });
        Swal.fire({
            icon: 'success',
            title: 'Compra Exitosa',
            text: response.data.message,
        });
        updateLocalBalance();
        setTimeout(() => {
            window.location.reload();
        } , 2000);
    } catch (error) {
        console.error('Error buying product:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al Comprar',
            text: error.response?.data?.error || 'Ha ocurrido un error desconocido',
        });
    }
};


  return (
    <div className="publicacion">
      <div className="bg-gray-100 z-0 rounded-xl drop-shadow-sm border h-[370px] w-[220px]  grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
        <div className="flex justify-between items-center pt-2 ppr-2 w-full">
          <div className="pl-4">
            <p className="text-gray-400 text-sm font-semibold">{type}</p>
          </div>
          <div>
            <Button
              ref={anchorRef}
              aria-controls={openMenu ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleMenu}
            >
              <FaEllipsisV />
            </Button>
            <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseMenu}>
                      <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={navigateToReportSection}>Reportar</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        <div className="w-full text-sm grid justify-center">
          
          <h3 className="text-md font-semibold justify-self-center">{product.name}</h3>
          <img
            src={`http://127.0.0.1:8000/api/storage/${product.image_path}`}
            alt={product.name}
            style={{ width: "200px", height: "200px" }} // Establecer el ancho y alto fijos
          />
          
          <p className="text-lg font-semibold text-green-500 justify-self-center">${product.price}</p>
          <p className="justify-self-center text-gray-500">{product.description}</p>
          <div className="justify-self-center flex  pt-2 font-semibold text-gray-500">
            <p className="text-gray-400 pr-1">Por:</p>
             {product.userName}
          </div>
          {/* Aquí puedes agregar más detalles del producto, como botones de compra, etc. */}
          <div className="flex justify-center text-sm">
            <Button className="text-sm text-neutral-500" onClick={navigateToMDSection}>
              <ForumIcon  className="text-sm text-neutral-500"/>
            </Button>
            <Button>
              <AddShoppingCartIcon  className="text-sm text-neutral-500"  onClick={() => handleBuyProduct(product.id)}/>
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isReportModalOpen} onClose={handleReportModalClose}>
        <Report isOpen={isReportModalOpen} 
          onClose={handleReportModalClose} 
          reportReason={reportReason} 
          onSubmit={handleReportSubmit}
          success={reportSuccess}/>
      </Modal>
      
      <Modal isOpen={isMensajeDirectoModalOpen} onClose={handleMensajeDirectoModalClose}>
        <MensajeDirectoModal 
          isOpen={isMensajeDirectoModalOpen}
          onClose={handleMensajeDirectoModalClose}
          recipientName={product.userName}
          productName={product.name}
        />
      </Modal>
    </div>
  );
};

export default PublicacionComponent;
