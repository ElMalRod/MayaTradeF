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

        <Route path="/visitante" element={<ViewVisitante />} />
        <Route path="/visit/productos" element={<PublicadorProductos />} />
        <Route path="/visit/servicios" element={<PublicadorServicios />} />

      </Routes>
    </Router>
  );
}

export default App;
