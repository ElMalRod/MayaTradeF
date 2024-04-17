import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicacionComponent from "./PublicacionComponent";
import { useParams } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener productos
        axios
        .get("http://127.0.0.1:8000/api/products")
        .then((response) => {
          const availableProducts = response.data.products.filter(product => product.approved && product.available);
          setProducts(availableProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

    }, []);

    return (
        <div className="w-full">
            <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
                {/* Mostrar productos */}
                {products.map((product) =>
                    // Verificar si el producto está aprobado
                    product.approved === 1 && (
                        <PublicacionComponent
                            key={product.id}
                            product={product}
                            type="Producto"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ProductList;
