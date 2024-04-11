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
import Report from "../components/Report";
import Modal from "../views/Modal";
import axios from "axios";


const PublicacionComponent = ({ type, product }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = React.useRef(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

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

  return (
    <div className="publicacion">
      <div className="bg-gray-100 z-0 rounded-xl drop-shadow-sm border h-[200px] w-[220px]  grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
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
          <p className="text-lg font-semibold text-green-500 justify-self-center">${product.price}</p>
          <p className="justify-self-center text-gray-500">{product.description}</p>
          <div className="justify-self-center flex  pt-2 font-semibold text-gray-500">
            <p className="text-gray-400 pr-1">Por:</p>
             {product.userName}
          </div>
          <img src={`http://127.0.0.1:8000/api/products${product.image_path}`} alt={product.name} />
          {/* Aquí puedes agregar más detalles del producto, como botones de compra, etc. */}
          <div className="flex justify-center text-sm">
            <Button className="text-sm text-neutral-500">
              <ForumIcon  className="text-sm text-neutral-500"/>
            </Button>
            <Button>
              <AddShoppingCartIcon  className="text-sm text-neutral-500" />
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
    </div>
  );
};

export default PublicacionComponent;
