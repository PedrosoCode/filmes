import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [editingId, setEditingId] = useState(null);

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

    const handleEditUsuario = (usuario) => {
        setEditingId(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
    };

    const handleUpdateUsuario = async () => {
        try {
            await axios.put(`http://localhost:5000/api/usuarios/${editingId}`, { nome, email });
            setEditingId(null);
            fetchData();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {editingId === usuario.id ? (
                            <>
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button onClick={handleUpdateUsuario}>Salvar</button>
                            </>
                        ) : (
                            <>
                                <strong>Nome:</strong> {usuario.nome}, <strong>Email:</strong> {usuario.email}
                                <button onClick={() => handleEditUsuario(usuario)}>Editar</button>
                                <button onClick={() => handleDeleteUsuario(usuario.id)}>Excluir</button>
                            </>
                        )}
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
