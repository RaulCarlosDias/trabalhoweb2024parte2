import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pesquisa = () => {
    const [pesquisas, setPesquisas] = useState([]);

    useEffect(() => {
        async function fetchPesquisas() {
            try {
                const response = await axios.get('http://localhost:5000/api/pesquisas');
                setPesquisas(response.data);
            } catch (error) {
                console.error('Erro ao buscar pesquisas:', error);
            }
        }
        fetchPesquisas();
    }, []);

    return (
        <div>
            <h1>Pesquisas</h1>
            <ul>
                {pesquisas.map(pesquisa => (
                    <li key={pesquisa.id}>{pesquisa.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pesquisa;
