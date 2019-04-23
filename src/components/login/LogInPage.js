import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogInPage: true,
      openSignIn: false,
      openSignUp: false
    };
  }

  openLogInPage = () => {
    this.setState({
      openLogInPage: true,
      openSignIn: false,
      openSignUp: false
    });
  };

  openSignIn = () => {
    this.setState({
      openLogInPage: false,
      openSignIn: true,
      openSignUp: false
    });
  };

  openSignUp = () => {
    this.setState({
      openLogInPage: false,
      openSignIn: false,
      openSignUp: true
    });
  };

  render() {
    return (
      <div>
        {this.state.openLogInPage && (
          <div>
            <h1 style={{ margin: 50, display: "center" }}>
              Create your own training schedule <br />
              and see how well you perform!
            </h1>
            <p>Log in to check your training schedule</p>
            <Button onClick={this.openSignIn} variant="outlined">
              Log in
            </Button>
            <p>Don't have an account yet? Sign up here!</p>
            <Button onClick={this.openSignUp} variant="outlined">
              Sign up
            </Button>
          </div>
        )}
        {this.state.openSignIn && <SignIn openLogInPage={this.openLogInPage} />}
        {this.state.openSignUp && <SignUp openLogInPage={this.openLogInPage} />}
      </div>
    );
  }
}
