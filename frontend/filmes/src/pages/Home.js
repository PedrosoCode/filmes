import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Bem-vindo à página inicial!</p>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/ConsumoTeste">ConsumoTeste</Link>
            </li>
          </ul>
        </nav>
    </div>
  );
};

export default Home;
