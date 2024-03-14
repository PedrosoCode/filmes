import React, { useEffect, useState } from 'react';

const App = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/filmes')
      .then(response => response.json())
      .then(data => setFilmes(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <div>
      <h1>Filmes</h1>
      <ul>
        {filmes.map(filme => (
          <li key={filme.id}>
            <h2>{filme.nome}</h2>
            <img src={filme.capa} alt={filme.nome} />
            <p><strong>Comentário Pessoa A:</strong> {filme.comentarioPessoaA}</p>
            <p><strong>Comentário Pessoa B:</strong> {filme.comentarioPessoaB}</p>
            <p><strong>Categoria:</strong> {filme.categoria}</p>
            <p><strong>Saga:</strong> {filme.saga}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
