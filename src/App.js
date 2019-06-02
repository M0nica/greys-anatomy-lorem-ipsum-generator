import React, { Component } from "react";
import { Footer } from "./Footer";
import "./App.css";
import parse from "html-react-parser";

class LambdaCall extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
    this.handleParagraphChange = this.handleParagraphChange.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  handleParagraphChange(event) {
    this.setState({paragraphValue: event.target.value});
    this.setState({wordValue: 0});

  }

  handleWordChange(event) {
    this.setState({wordValue: event.target.value});
    this.setState({paragraphValue: 0});
  }



  render() {
    const { loading, msg } = this.state;

    return (
      <>
        <p>
          <button
            onClick={this.handleClick("generate-lorem-ipsum?paragraphs=" + this.state.paragraphValue + "&words=" + this.state.wordValue)}
            className="button"
          >
            {loading ? "Loading..." : "Generate Lorem Ipsum"}
          </button>
          <br />
          <br />

          <div>Generate text by paragraph or word</div>

          <br />
          <form>
            <div>            
              Number of paragraphs to generate: <input value={this.state.paragraphValue} onChange={this.handleParagraphChange} type="number" name="paragraphValue" min="0" max="50"></input>
            </div>
            <div>
              Number of words to generate: <input value={this.state.wordValue} onChange={this.handleWordChange} type="number" name="wordValue" min="0" max="50"></input>
            </div>
          </form>
          <br />

          {msg && parse(msg)}
        </p>
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
