import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicacionComponent from "./PublicacionComponent";
import { useParams } from "react-router-dom";

const PublicacionesList = () => { // Cambiar el nombre del componente
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
        {products.map((product) => (
          <PublicacionComponent
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicacionesList;