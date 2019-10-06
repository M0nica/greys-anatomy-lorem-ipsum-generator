import React, { Component } from "react";
import { Footer } from "./Footer";
import "./App.css";
import parse from "html-react-parser";

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

  render() {
    const { loading, msg } = this.state;

    return (
      <>
        <p>
          <button
            onClick={this.handleClick("generate-lorem-ipsum")}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorem Ipsum"}
          </button>
        </p>
        {msg && parse(msg)}
      </>
    );
  }
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
          <LambdaCall />
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
