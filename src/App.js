import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/usuarios/login', {
        username: 'raul',
        password: 'raul',
      });
      setAuthToken(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      setMensagem('Login bem-sucedido');
    } catch (error) {
      setMensagem('Erro ao fazer login');
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    setMensagem('Logout realizado com sucesso');
  };

  const handleCriarPesquisa = async () => {
    try {
      await axios.post('/api/pesquisas', { titulo, comentario }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMensagem('Pesquisa criada com sucesso');
    } catch (error) {
      setMensagem('Erro ao criar pesquisa');
    }
  };

  const buscarPesquisaPorTitulo = async () => {
    try {
      const response = await axios.get('/api/pesquisas/buscar', {
        params: { titulo },
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setMensagem(`Pesquisa encontrada: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setMensagem('Erro ao buscar pesquisa');
    }
  };

  return (
    <Router>
      <div className="container">
        <h1 className="titulo">Projeto Final Web</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/criar-pesquisa">Criar Pesquisa</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-pesquisa" element={
            <div>
              <h2>Criar Pesquisa</h2>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
              <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentário" />
              <button onClick={handleCriarPesquisa}>Criar Pesquisa</button>
              <button onClick={buscarPesquisaPorTitulo}>Buscar Pesquisa</button>
              <p className={mensagem.includes('Erro') ? 'mensagem-erro' : 'mensagem-sucesso'}>{mensagem}</p>
            </div>
          } />
        </Routes>
        {authToken ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Bem-vindo ao Projeto Final Web</h2>
    </div>
  );
}

export default App;
