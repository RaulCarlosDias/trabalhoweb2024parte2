import React, { createContext, useContext, useState } from 'react';

const ContextoPesquisa = createContext();

export const useContextoPesquisa = () => useContext(ContextoPesquisa);

export const ProvedorPesquisa = ({ children }) => {
  const [resultadosPesquisa, setarResultadosPesquisa] = useState([]);
  const [pesquisasAnteriores, setarPesquisasAnteriores] = useState([]);
  const [mensagemErro, setarMensagemErro] = useState('');

  return (
    <ContextoPesquisa.Provider value={{ resultadosPesquisa, setarResultadosPesquisa, pesquisasAnteriores, setarPesquisasAnteriores, mensagemErro, setarMensagemErro }}>
      {children}
    </ContextoPesquisa.Provider>
  );
};

