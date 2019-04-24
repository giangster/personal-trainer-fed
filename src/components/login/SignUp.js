import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Sign Up today!</h3>
        <Button
          style={{
            display: "center",
            margin: 10
          }}
          variant="outlined"
          onClick={this.props.openLogInPage}
        >
          &laquo; Backkk
        </Button>
      </div>
    );
  }
}
