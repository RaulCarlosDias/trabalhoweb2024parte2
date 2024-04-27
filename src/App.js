import React, { useState, useEffect, useRef } from 'react';
import { Form, Alert, Button, Card, Col, Row, ListGroup } from 'react-bootstrap';
import './App.css';

const API_URL = 'https://restcountries.com/v3.1';

const App = () => {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query && query.trim().length > 1) {
      const fetchSuggestions = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/name/${query}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar os países');
          }
          const data = await response.json();
          setSuggestions(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query && query.trim().length > 1) {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/name/${query}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar o país');
        }
        const data = await response.json();
        const filteredData = data.filter((item) =>
          item.name.common.toLowerCase() === query.toLowerCase()
        );
        if (filteredData.length === 0) {
          throw new Error('País não encontrado');
        }
        setCountry(filteredData[0]);
        setSearchHistory((prevHistory) => [...prevHistory, filteredData[0]]);
        setQuery('');
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError('Por favor, insira o nome completo de um país');
    }
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container mt-4">
      <h1 className="titulo mb-4">Pesquisa de Países</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Col>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Digite o nome do país"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ListGroup className="position-absolute">
                  {suggestions.map((country, index) => (
                    <ListGroup.Item key={index}>
                      {country.name.common}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={handleShowHistory}>
              Histórico de Pesquisa
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Pesquisar'}
            </Button>
          </Col>
        </Row>
      </Form>
      {showHistory && (
        <div className="border p-3 mt-4">
          <h5>Histórico de Pesquisas:</h5>
          {searchHistory.map((country, index) => (
            <Card key={index} className="mt-2">
              <Card.Body>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Text>Capital: {country.capital}</Card.Text>
                <Card.Text>População: {country.population}</Card.Text>
                <Card.Img
                  variant="bottom"
                  src={country.flags.svg}
                  style={{ maxWidth: '100px' }}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {country && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Text>Capital: {country.capital}</Card.Text>
            <Card.Text>População: {country.population}</Card.Text>
            <Card.Img
              variant="bottom"
              src={country.flags.svg}
              style={{ maxWidth: '200px' }}
            />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default App;
