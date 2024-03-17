const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json()); // Permite o uso de req.body para análise de solicitação JSON

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

// Configuração do CORS
app.use(cors());

// Configuração do Multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Rota para fazer upload da foto do usuário
app.post('/api/usuarios/upload', upload.single('foto'), (req, res) => {
    if (!req.file) {
        res.status(400).send('Nenhum arquivo enviado');
        return;
    }
    const fotoPath = req.file.path;
    res.status(200).json({ fotoPath: fotoPath });
});

// Rota para atualizar o caminho da foto do usuário no banco de dados
app.put('/api/usuarios/:id/foto', (req, res) => {
    const userId = req.params.id;
    const { fotoPath } = req.body;
    const query = 'UPDATE usuarios SET foto = ? WHERE id = ?';
    connection.query(query, [fotoPath, userId], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar a foto do usuário:', err);
            res.status(500).send('Erro ao atualizar a foto do usuário no banco de dados');
            return;
        }
        res.status(200).send('Foto do usuário atualizada com sucesso');
    });
});

// Rota para buscar todos os usuários
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

// Rota para buscar um usuário pelo ID
app.get('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).send('Erro ao buscar usuário do banco de dados');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Usuário não encontrado');
            return;
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo usuário
app.post('/api/usuarios', (req, res) => {
    const { nome, email } = req.body;
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    connection.query(query, [nome, email], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar usuário:', err);
            res.status(500).send('Erro ao adicionar usuário ao banco de dados');
            return;
        }
        res.status(201).send('Usuário adicionado com sucesso');
    });
});

// Rota para atualizar um usuário existente
app.put('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const { nome, email } = req.body;
    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    connection.query(query, [nome, email, userId], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send('Erro ao atualizar usuário no banco de dados');
            return;
        }
        res.status(200).send('Usuário atualizado com sucesso');
    });
});

// Rota para excluir um usuário
app.delete('/api/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao excluir usuário:', err);
            res.status(500).send('Erro ao excluir usuário do banco de dados');
            return;
        }
        res.status(200).send('Usuário excluído com sucesso');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
