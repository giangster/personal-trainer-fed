import React, { Component } from "react";
import personaltrainer from "../src/assets/personaltrainer.png";
import Button from "@material-ui/core/Button";

var homePageStyle = {
  width: "100%",
  height: 700,

  backgroundImage: "url(" + personaltrainer + ")",
  backgroundPosition: "center",
  backgroundSize: "cover"
};

export default class HomePage extends Component {
  render() {
    return (
      <div style={homePageStyle}>
        <h1 style={{ color: "white", fontStyle: "bolder" }}>
          <strong>Welcome to Personal Trainer Company</strong>
        </h1>
        <br />
        <br />
        <h2>
          <strong>Get fit everyday!</strong>
        </h2>
        <br />
        <br />
        <h3>Check customer database</h3>
        <Button color="default" variant="outlined">
          Click here &raquo;
        </Button>
      </div>
    );
  }
}
