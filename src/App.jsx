import React, { useState } from 'react';
import parse from 'html-react-parser';
import Footer from './Footer';
import './App.css';

function Quotes() {
  const [quotes, setQuotes] = useState({ loading: false, msg: null });
  const { loading, msg } = quotes;
  const api = 'generate-lorem-ipsum';

  function handleClick(event) {
    event.preventDefault();

    setQuotes({ ...quotes, loading: true });
    fetch(`/.netlify/functions/${api}`)
      .then((response) => response.json())
      .then((json) => setQuotes({ ...quotes, msg: json.msg }))
      // eslint-disable-next-line no-console
      .catch((err) => console.warn(err))
      .finally(setQuotes({ ...quotes, loading: false }));
  }

  return (
    <>
      <p>
        <button type="submit" onClick={handleClick} className="button">
          {loading ? 'Loading...' : 'Generate Lorem Ipsum'}
        </button>
      </p>
      {msg && parse(msg)}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span id="grey-title">Grey&apos;s</span>
          Anatomy
          <br />
          Lorem Ipsum Generator
        </h1>
        <Quotes />
      </header>
      <Footer />
    </div>
  );
}

export default App;
