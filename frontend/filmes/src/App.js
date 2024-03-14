import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Componentes para as páginas
import Home from './pages/Home';
import About from './pages/About';
import ConsumoTeste from './pages/ConsumoTeste';

const App = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ConsumoTeste" element={<ConsumoTeste />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
