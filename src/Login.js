import React, { useState, useContext } from 'react';
import { AuthContext } from './searchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/login', { nome, senha });
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                setAuth({ nome });
                navigate('/pesquisa');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <label>
                Senha:
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
