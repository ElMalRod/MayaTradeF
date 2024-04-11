import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import ViewAdmin from './views/ViewAdmin';
import ViewUser from './views/ViewUser';

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

      </Routes>
    </Router>
  );
}

export default App;
