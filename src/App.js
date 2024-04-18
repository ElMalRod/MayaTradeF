import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import ViewAdmin from './views/ViewAdmin';
import ViewUser from './views/ViewUser';
import MisPublicaciones from './views/publicador/MisPublicaciones';
import PublicadorChat from './views/publicador/ViewChatPublicador';
import PublicadorProductos from './views/publicador/PublicadorProductos';
import PublicadorServicios from './views/publicador/PublicadorServicios';
import ViewVisitante from './views/ViewVisitante';
import Voluntariado from './views/publicador/Voluntariado';
import ViewComprador from './views/ViewComprador';
import VisitanteProductos from './views/visitante/VisitanteProductos';
import VisitanteServicios from './views/visitante/VIsitanteServicios';
import VisitanteVoluntariado from './views/visitante/VisitanteVoluntariado';

import CompradorChat from './views/comprador/ViewChatComprador';
import CompradorProductos from './views/comprador/CompradorProductos';
import CompradorServicios from './views/comprador/CompradorServicios';
import CompradorVoluntariado from './views/comprador/CompradorVoluntariado';
import 'alpinejs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ViewAdmin />} />
        <Route path="/vendedor" element={<ViewUser />} />

        <Route path="/publicador" element={<ViewUser />} />
        <Route path="/publicador/publicaciones" element={<MisPublicaciones />} />
        <Route path="/publicador/chat" element={<PublicadorChat />} />
        <Route path="/publicador/productos" element={<PublicadorProductos />} />
        <Route path="/publicador/servicios" element={<PublicadorServicios />} />
        <Route path="/publicador/voluntariado" element={<Voluntariado />} />

        <Route path="/visitante" element={<ViewVisitante />} />
        <Route path="/visitante/productos" element={<VisitanteProductos />} />
        <Route path="/visitante/servicios" element={<VisitanteServicios />} />
        <Route path="/visitante/servicios" element={<VisitanteServicios />} />
        <Route path="/visitante/voluntariado" element={<VisitanteVoluntariado />} />

        <Route path="/comprador" element={<ViewComprador />} />
        <Route path="/comprador/chat" element={<CompradorChat />} />
        <Route path="/comprador/productos" element={<CompradorProductos />} />
        <Route path="/comprador/servicios" element={<CompradorServicios />} />
        <Route path="/comprador/servicios" element={<CompradorServicios />} />
        <Route path="/comprador/voluntariado" element={<CompradorVoluntariado />} />
      </Routes>
    </Router>
  );
}

export default App;
