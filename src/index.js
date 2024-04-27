import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvedorPesquisa } from './searchContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ProvedorPesquisa>
      <App />
    </ProvedorPesquisa>
  </React.StrictMode>,
  document.getElementById('root')
);
