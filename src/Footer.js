import React from "react";
import "./Footer.css";
export class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>
          {" "}
          Grey's Anatomy Lorem Ipsum Generator coded by:{" "}
          <a href="https://www.aboutmonica.com">Monica Powell</a> <br />
          <a href="https://github.com/M0nica/greys-anatomy-lorem-ipsum-generator">
            View Code
          </a>
        </p>
        <p>
          Copyright to "Grey's Anatomy" is held by various outside entities
          and is provided here for educational purposes only.
        </p>
      </div>
    );
  }
}
