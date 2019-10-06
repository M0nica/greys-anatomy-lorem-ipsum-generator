import React, { Component } from "react";
import { Footer } from "./Footer";
import "./App.css";
import parse, {domToReact} from "html-react-parser";
import ClipboardJS from "clipboard";

class LambdaCall extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  parseOptions = {
    replace: function ({ name, children }) {
      if (name === "p") {
        const id = "p" + Math.random().toString(36).substr(2, 5);

        return (
          <div className="paragraph">
            <button className="btn-copy" data-clipboard-target={"#" + id}>Copy</button>
            <p id={id}>{domToReact(children)}</p>
          </div>
        );
      }
    }
  };

  render() {
    const { loading, msg } = this.state;

    let btnCopyAll = '';

    if (msg) {
      btnCopyAll = <button id="btn-copy-all" className="button">Copy all</button>;
    }

    return (
      <>
        <p>
          <button
            onClick={this.handleClick("generate-lorem-ipsum")}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorem Ipsum"}
          </button> 
          {msg && btnCopyAll}
        </p>
        <div id="paragraphs">
          {msg && parse(msg, this.parseOptions)}
        </div>
      </>
    );
  }
}

class App extends Component {
  render() {
    new ClipboardJS("#btn-copy-all", {
      text: function () {
        return [].map.call(
          document.querySelectorAll("#paragraphs p"),
          p => { return p.textContent }
        ).join("\n");
      }
    });

    new ClipboardJS(".btn-copy");

    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <span id="grey-title">Grey's</span> Anatomy <br /> Lorem Ipsum
            Generator
          </h1>
          <LambdaCall />
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
