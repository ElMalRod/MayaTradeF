import React, { useState, useEffect } from "react";
import {
    FaEllipsisV,
    FaRegCopy,
    FaArrowsAlt,
    FaTrash,
    FaShare,
  } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { format } from 'date-fns';


const PublicacionComponent = ({ product }) => {
  return (
    <div className="publicacion">
       <div className="bg-gray-100 z-0 rounded-xl drop-shadow-sm border h-[200px] w-[220px]  grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
      <div className="text-red-400 flex justify-self-end pt-4 pr-2">
        <div>
          <Button
            aria-haspopup="true"
          >
            <FaEllipsisV />
          </Button>
          <Popper
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener >
                    <MenuList
                      id="menu-list-grow"
                      className="text-gray-700"
                    >
                      <MenuItem className="flex gap-2">
                        <FaRegCopy />Copiar
                      </MenuItem>
                      <MenuItem
                      
                        className="flex gap-2"
                      >
                        <FaArrowsAlt />Mover
                      </MenuItem>
                      <MenuItem className="flex gap-2">
                        <FaShare />Compartir
                      </MenuItem>
                      <MenuItem className="flex gap-2">
                        <FaTrash />Eliminar
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <p>Vendedor : {product.UserName}</p>       
      <h3>{product.name}</h3>
      
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <img src={`http://127.0.0.1:8000/api/products${product.image_path}`} alt={product.name} />
      {/* Aquí puedes agregar más detalles del producto, como botones de compra, etc. */}
      </div>
    </div>
  );
};

export default PublicacionComponent;