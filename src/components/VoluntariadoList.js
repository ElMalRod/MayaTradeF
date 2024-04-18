import React, { useEffect, useState } from "react";
import axios from "axios";
import VoluntariadoComponent from "./VoluntariadoComponent"; // Make sure this path is correct

const VoluntariadoList = () => {
    const [volunteerings, setVolunteerings] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/volunteering")
        .then(response => {
            // Filter for active and approved volunteerings
            const validVolunteerings = response.data.volunteering.filter(v => v.active && v.approved);
            setVolunteerings(validVolunteerings);
        })
        .catch(error => {
            console.error("Error fetching volunteerings:", error);
        });
    }, []);

    return (
        <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {volunteerings.map((volunteering) => (
                <VoluntariadoComponent
                    key={volunteering.id}
                    volunteering={volunteering}
                />
            ))}
        </div>
    );
};

export default VoluntariadoList;
