import React, { useState } from "react";
import { FaEllipsisV, FaHandsHelping } from "react-icons/fa";
import { Button, Paper, Popper, MenuItem, MenuList, ClickAwayListener, Grow } from "@material-ui/core";
import Modal from "../views/Modal";
import Report from "./Report";
import MensajeDirectoModal from "./MensajeDirectoModal";
import Swal from "sweetalert2";
import axios from "axios";

const VoluntariadoComponent = ({ volunteering }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const anchorRef = React.useRef(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isMensajeDirectoModalOpen, setIsMensajeDirectoModalOpen] = useState(false);
    const currentUser = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId'); // Assuming 'userId' is stored in local storage

    const handleToggleMenu = () => {
        setOpenMenu(prevOpen => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenMenu(false);
    };

    const handleReportModalOpen = () => setIsReportModalOpen(true);
    const handleReportModalClose = () => setIsReportModalOpen(false);

    const handleReportSubmit = async (reason) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/volunteering/${volunteering.id}/report`, {
                report_reason: reason
            });
            Swal.fire("Reportado exitosamente", "Su informe ha sido enviado.", "success");
            setIsReportModalOpen(false);
        } catch (error) {
            Swal.fire("Failed", "No se pudo informar del voluntariado. Por favor, inténtelo de nuevo más tarde.", "error");
        }
    };

    const handleMensajeDirectoModalOpen = () => {
        if (currentUser === volunteering.userName) {
            Swal.fire("Oops...", "¡No puedes enviarte mensajes a ti mismo!", "error");
        } else {
            setIsMensajeDirectoModalOpen(true);
        }
    };

    const handleMensajeDirectoModalClose = () => setIsMensajeDirectoModalOpen(false);

    const handleParticipate = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/volunteering/${volunteering.id}/participate`, {
                user_id: userId // Sending the current user's ID
            });
            Swal.fire("Participación exitosa", response.data.message, "success");
        } catch (error) {
            Swal.fire("Error al participar", error.response?.data?.error || "Ocurrió un error desconocido.", "error");
        }
    };

    return (
        <div className="shadow rounded-lg p-4 mb-6 bg-gray-100 h-[370px] w-[220px]">
            <div className="flex justify-between items-center text-neutral-800">
                <h3 className="text-lg font-bold">{volunteering.title}</h3>
                <Button ref={anchorRef} aria-controls={openMenu ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggleMenu}>
                    <FaEllipsisV />
                </Button>
                <Popper open={openMenu} anchorEl={anchorRef.current} transition disablePortal>
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseMenu}>
                                    <MenuList>
                                        <MenuItem onClick={handleReportModalOpen}>Report</MenuItem>
                                        <MenuItem onClick={handleMensajeDirectoModalOpen}>Send Message</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
            <p className="text-neutral-600">{volunteering.description}</p>
            <div className="flex justify-start gap-2 items-center my-2 text-sm text-neutral-700">
               <p className="font-semibold">Compensación:</p>
               <p>{volunteering.compensation_value} {volunteering.compensation_type}</p>
            </div>
            <div className="bg-gray-200 px-4 py-2 w-full flex gap-2 justify-center items-center text-neutral-600 font-semibold hover:bg-sky-400 hover:text-white ease-out cursor-pointer"
                 onClick={handleParticipate}>
                <FaHandsHelping style={{ cursor: 'pointer' }} /> Aceptar
            </div>
            {volunteering.image_path && (
                <img src={`http://127.0.0.1:8000/api/storage/${volunteering.image_path}`} alt="Volunteering" className="mt-2 max-w-full h-auto rounded-lg" />
            )}
            <Modal isOpen={isReportModalOpen} onClose={handleReportModalClose}>
                <Report isOpen={isReportModalOpen} onClose={handleReportModalClose} onSubmit={handleReportSubmit} />
            </Modal>
            <Modal isOpen={isMensajeDirectoModalOpen} onClose={handleMensajeDirectoModalClose}>
                <MensajeDirectoModal isOpen={isMensajeDirectoModalOpen} onClose={handleMensajeDirectoModalClose} recipientName={volunteering.userName} volunteeringTitle={volunteering.title} />
            </Modal>
        </div>
    );
};

export default VoluntariadoComponent;
