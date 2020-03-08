import React, { Component, useState } from "react";
import { Footer } from "./Footer";
import "./App.css";
import parse from "html-react-parser";

function Quotes() {
  const [quotes, setQuotes] = useState({ loading: false, msg: null });
  const { loading, msg } = quotes;
  const api = "generate-lorem-ipsum";

  function handleClick(event) {
    event.preventDefault();

    setQuotes({ ...quotes, loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => setQuotes({ ...quotes, msg: json.msg }))
      .catch(err => console.log(err))
      .finally(setQuotes({ ...quotes, loading: false }));
  }

  return (
    <>
      <p>
        <button onClick={handleClick} className="button">
          {loading ? "Loading..." : "Generate Lorem Ipsum"}
          {console.log("STATE", quotes)}
        </button>
      </p>
      {msg && parse(msg)}
    </>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <span id="grey-title">Grey's</span> Anatomy <br /> Lorem Ipsum
            Generator
          </h1>
          <Quotes />
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
