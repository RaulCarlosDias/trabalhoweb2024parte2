import React, { useState } from 'react';
import axios from 'axios';

const Inserir = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/pesquisas', { titulo, descricao });
            setTitulo('');
            setDescricao('');
            alert('Pesquisa inserida com sucesso!');
        } catch (error) {
            console.error('Erro ao inserir pesquisa:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Título:
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </label>
            <label>
                Descrição:
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </label>
            <button type="submit">Inserir Pesquisa</button>
        </form>
    );
};

export default Inserir;
