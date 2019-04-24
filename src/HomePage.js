import React, { Component } from "react";
import personaltrainer from "../src/assets/personaltrainer.png";

var homePageStyle = {
  width: "100%",
  height: 1000,
  backgroundImage: "url(" + personaltrainer + ")",
  backgroundPosition: "bottom",
  backgroundSize: "cover"
};

export default class HomePage extends Component {
  render() {
    return (
      <div style={homePageStyle}>
        <h1 style={{ marginBottom: 20, fontWeight: "bolder", fontSize: 50 }}>
          Welcome to Personal Trainer Company
        </h1>
        <br />
        <br />
        <h2 style={{ marginBottom: 20, fontStyle: "bolder", fontSize: 40 }}>
          <strong>Get fit everyday!</strong>
        </h2>
        <br />
        <br />
      </div>
    );
  }
}
