import React, { Component } from "react";
import { firebaseAuth } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

export default class LogIn extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    showPassword: false
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  resetPassword = event => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    firebaseAuth()
      .sendPasswordResetEmail(email)
      .then(function() {
        toast.success("Password reset email sent.", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch(function(error) {
        toast.error(
          "Error in resetting password. Type your email to email field.",
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
      });
  };

  onLoginClick = event => {
    event.preventDefault();

    const { email, password } = this.state;
    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect
        this.setState({ redirect: true });
      })
      .catch(() => {
        // No account found. Create a new one and send verification email
        firebaseAuth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            var user = firebaseAuth().currentUser;
            user
              .sendEmailVerification()
              .then(function() {
                toast.success("Verification email sent.", {
                  position: toast.POSITION.TOP_RIGHT
                });
              })
              .catch(function(error) {
                toast.error("Error in authentication.", {
                  position: toast.POSITION.TOP_RIGHT
                });
              });
          })
          .catch(() => {
            toast.error("Could not login. Check your email and password.", {
              position: toast.POSITION.TOP_RIGHT
            });
          });
      });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div>
          <div>
            <div>
              <TextField
                style={{ width: 250, height: 60 }}
                id="email"
                label="Email"
                onChange={this.handleChanges}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <TextField
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label="Password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>
          <div>
            <Button
              style={{
                display: "inline-block",
                margin: 10
              }}
              variant="outlined"
              onClick={this.onLoginClick}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              style={{
                display: "inline-block",
                margin: 10
              }}
              variant="outlined"
              color="secondary"
              onClick={this.resetPassword}
            >
              Forgot password?
            </Button>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}
