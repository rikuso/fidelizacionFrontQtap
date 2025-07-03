import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './pages/Landing';
import AdminStats from './pages/AdminStats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal de registro */}
        <Route path="/:uid" element={<Home />} />
        {/* Landing público con UID */}
        <Route path="/landing/:uid" element={<Landing />} />
        {/* Panel administrativo de estadísticas */}
        <Route path="/admin/stats" element={<AdminStats />} />
      </Routes>
    </Router>
  );
}

export default App;
