const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuração do MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Inspiron1',
    database: 'movie_database'
});

// Conexão com o MySQL
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});

// Rota para buscar dados do banco de dados
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Erro ao buscar dados:', err);
          res.status(500).send('Erro ao buscar dados do banco de dados');
          return;
      }
      res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
