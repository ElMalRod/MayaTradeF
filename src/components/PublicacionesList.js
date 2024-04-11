import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicacionComponent from "./PublicacionComponent";
import { useParams } from "react-router-dom";

const PublicacionesList = () => { // Cambiar el nombre del componente
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Obtener productos
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Obtener servicios
    axios
      .get("http://127.0.0.1:8000/api/services")
      .then((response) => {
        setServices(response.data.services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
        {/* Mostrar productos */}
        {products.map((product) => (
          <PublicacionComponent
            key={product.id}
            product={product}
            type= 'Producto'
          />
        ))}
        {/* Mostrar servicios */}
        {services.map((service) => (
          <PublicacionComponent
            key={service.id}
            product={service}
            type='Servicio'
          />
        ))}
      </div>
    </div>
  );
};

export default PublicacionesList;
