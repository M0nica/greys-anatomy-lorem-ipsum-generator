import React, { Component } from "react";
import { Footer } from "./Footer";
import "./App.css";
import parse from "html-react-parser";

class LambdaCall extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null, param: "paragraphs", value: "" };
  }

  handleClick = api => e => {
    e.preventDefault();
    const { param, value } = this.state;
    const queryString = value ? `?${param}=${value}` : '';

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api + queryString)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { loading, msg } = this.state;

    return (
      <>
        <div className="lambda-container">
          <button
            onClick={this.handleClick("generate-lorem-ipsum")}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorem Ipsum"}
          </button>
          <div className="settings">
            <input className="settings-input" name="value" type="number" value={this.state.value} onChange={this.handleChange} />
            <select className="settings-select" name="param" value={this.state.param} onChange={this.handleChange}>
              <option value="paragraphs">PARAGRAPHS</option>
              <option value="words">TERMS</option>
            </select>
          </div>
        </div>
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
