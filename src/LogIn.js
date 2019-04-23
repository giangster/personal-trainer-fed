import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: "",
      password: ""
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addUser = () => {
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.addUser(newUser);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="username"
              label="Username"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              type="password"
              name="password"
              label="Password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.addCustomer} color="default">
              Log In
            </Button>
          </DialogActions>
        </Dialog>
        <h1 style={{ margin: 50, position: "" }}>
          Get your own training schedule <br />
          and see how well you are performing everyday!
        </h1>
        <p>Log in to check your training schedule</p>
        <Button onClick={this.handleClickOpen} variant="outlined">
          Log in
        </Button>
        <p>Don't have an account yet? Sign up here!</p>
        <Button onClick={this.handleClickOpen} variant="outlined">
          Sign up
        </Button>
      </div>
    );
  }
}
