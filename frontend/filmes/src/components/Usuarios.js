import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const handleAddUsuario = async () => {
        try {
            await axios.post('http://localhost:5000/api/usuarios', { nome, email });
            setNome('');
            setEmail('');
            fetchData();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    const handleDeleteUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
            fetchData();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <strong>Nome:</strong> {usuario.nome}, <strong>Email:</strong> {usuario.email}
                        <button onClick={() => handleDeleteUsuario(usuario.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <h2>Adicionar Novo Usuário</h2>
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleAddUsuario}>Adicionar</button>
        </div>
    );
};

export default Usuarios;
