import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <strong>Nome:</strong> {usuario.nome}, <strong>Email:</strong> {usuario.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usuarios;
