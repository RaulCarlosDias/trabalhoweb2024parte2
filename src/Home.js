import React, { useContext } from 'react';
import { AuthContext } from './searchContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null);
        navigate('/login');
    };

    return (
        <div>
            <h1>Bem-vindo, {auth ? auth.username : 'Visitante'}</h1>
            {auth ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <p>Faça o login para acessar as pesquisas</p>
            )}
        </div>
    );
};

export default Home;
