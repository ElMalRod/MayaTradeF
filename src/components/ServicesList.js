import React, { useEffect, useState } from "react";
import axios from "axios";
import PublicacionComponent from "./PublicacionComponent";
import { useParams } from "react-router-dom";

const ServicesList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Obtener productos
        axios
            .get("http://127.0.0.1:8000/api/services")
            .then((response) => {
                setServices(response.data.services);
            })
            .catch((error) => {
                console.error("Error al recuperar services:", error);
            });

    }, []);

    return (
        <div className="w-full">
            <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
                {/* Mostrar productos */}
                {services.map((service) =>
                    // Verificar si el servicio está aprobado
                    service.approved === 1 && (
                        <PublicacionComponent
                            key={service.id}
                            product={service}
                            type="Servicio"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ServicesList;
