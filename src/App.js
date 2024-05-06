import React, { useState, useEffect, useRef } from 'react';
import { Form, Alert, Button, Card, Col, Row, ListGroup } from 'react-bootstrap';
import './App.css';

const URL_API = 'https://restcountries.com/v3.1';

const App = () => {
  const [consulta, setConsulta] = useState('');
  const [pais, setPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const refInput = useRef();
  const [sugestoes, setSugestoes] = useState([]);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  useEffect(() => {
    if (consulta && consulta.trim().length > 1) {
      const buscarSugestoes = async () => {
        try {
          setCarregando(true);
          const response = await fetch(`${URL_API}/name/${consulta}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar os países');
          }
          const dados = await response.json();
          setSugestoes(dados);
          setCarregando(false);
        } catch (error) {
          setErro(error.message);
          setCarregando(false);
        }
      };
      buscarSugestoes();
    } else {
      setSugestoes([]);
    }
  }, [consulta]);

  const realizarPesquisa = async (e) => {
    e.preventDefault();
    if (consulta && consulta.trim().length > 1) {
      try {
        setCarregando(true);
        const response = await fetch(`${URL_API}/name/${consulta}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar o país');
        }
        const dados = await response.json();
        const dadosFiltrados = dados.filter((item) =>
          item.name.common.toLowerCase() === consulta.toLowerCase()
        );
        if (dadosFiltrados.length === 0) {
          throw new Error('País não encontrado');
        }
        setPais(dadosFiltrados[0]);
        setHistorico((historicoAnterior) => [...historicoAnterior, dadosFiltrados[0]]);
        setConsulta('');
        setErro(null);
      } catch (error) {
        setErro(error.message);
        setCarregando(false);
      }
    } else {
      setErro('Por favor, insira o nome completo de um país');
    }
  };

  const alternarHistorico = () => {
    setMostrarHistorico(!mostrarHistorico);
  };

  return (
    <div className="container mt-4">
      <h1 className="titulo mb-4">Pesquisa de Países</h1>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Form onSubmit={realizarPesquisa}>
        <Row className="mb-3">
          <Col>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Digite o nome do país"
                ref={refInput}
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
              />
              {sugestoes.length > 0 && (
                <ListGroup className="position-absolute">
                  {sugestoes.map((pais, index) => (
                    <ListGroup.Item key={index}>
                      {pais.name.common}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={alternarHistorico}>
              Histórico de Pesquisa
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={carregando}>
              {carregando ? 'Carregando...' : 'Pesquisar'}
            </Button>
          </Col>
        </Row>
      </Form>
      {mostrarHistorico && (
        <div className="border p-3 mt-4">
          <h5>Histórico de Pesquisas:</h5>
          {historico.map((pais, index) => (
            <Card key={index} className="mt-2">
              <Card.Body>
                <Card.Title>{pais.name.common}</Card.Title>
                <Card.Text>Capital: {pais.capital}</Card.Text>
                <Card.Text>População: {pais.population}</Card.Text>
                <Card.Img
                  variant="bottom"
                  src={pais.flags.svg}
                  style={{ maxWidth: '100px' }}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {pais && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>{pais.name.common}</Card.Title>
            <Card.Text>Capital: {pais.capital}</Card.Text>
            <Card.Text>População: {pais.population}</Card.Text>
            <Card.Img
              variant="bottom"
              src={pais.flags.svg}
              style={{ maxWidth: '200px' }}
            />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default App;
