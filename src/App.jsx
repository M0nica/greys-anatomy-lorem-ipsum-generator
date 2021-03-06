import React, { useState } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ClipboardJS from 'clipboard';
import Footer from './Footer';
import './App.css';

function Quotes() {
  const [quotes, setQuotes] = useState({ loading: false, msg: null });
  const { loading, msg } = quotes;
  const api = 'generate-lorem-ipsum';

  const [paragraphCount, setParagraphCount] = useState(4);

  const handleChange = e => {
    const num = parseInt(e.target.value, 10);
    if (!Number.isNaN(num) && num >= 2 && num <= 50) {
      setParagraphCount(num);
    }
  };

  function handleClick(event) {
    event.preventDefault();

    setQuotes({ ...quotes, loading: true });
    fetch(`/.netlify/functions/${api}?paragraphs=${paragraphCount}`)
      .then(response => response.json())
      .then(json => setQuotes({ ...quotes, msg: json.msg }))
      // eslint-disable-next-line no-console
      .catch(err => console.warn(err))
      .finally(setQuotes({ ...quotes, loading: false }));
  }

  const parseOptions = {
    replace({ name, children }) {
      if (name === 'p') {
        const id = `p${Math.random()
          .toString(36)
          .substr(2, 5)}`;

        return (
          <div className="paragraph">
            <p id={id}>{domToReact(children)}</p>
          </div>
        );
      }
    },
  };

  let btnCopyAll = '';

  if (msg) {
    btnCopyAll = (
      <button id="btn-copy-all" className="button" type="button">
        Copy To Clipboard
      </button>
    );
  }

  return (
    <>
      <form>
        <label htmlFor="numberInput">
          How many paragraphs should be generated?
          <br />
          <div className="inputSelection">
            {' '}
            <input
              id="numberInput"
              type="number"
              min="2"
              max="50"
              onChange={handleChange}
              defaultValue={paragraphCount}
            />
            <button type="submit" onClick={handleClick} className="button">
              {loading ? 'Loading...' : 'Generate Lorem Ipsum'}
            </button>
          </div>
          <br />
        </label>
      </form>

      {msg && btnCopyAll}
      <div id="paragraphs"> {msg && parse(msg, parseOptions)}</div>
    </>
  );
}

function App() {
  new ClipboardJS('#btn-copy-all', {
    text() {
      return [].map
        .call(document.querySelectorAll('#paragraphs p'), p => {
          return p.textContent;
        })
        .join('\n');
    },
  });

  new ClipboardJS('.btn-copy');

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span id="grey-title">Grey&apos;s</span> Anatomy
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
