import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
      dialogueOpenStatus: false
    };
  }
  changeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({
      firstname: this.props.customer.firstname,
      lastname: this.props.customer.lastname,
      streetaddress: this.props.customer.streetaddress,
      postcode: this.props.customer.postcode,
      city: this.props.customer.city,
      email: this.props.customer.email,
      phone: this.props.customer.phone,
      dialogueOpenStatus: true
    });
  };

  handleClose = () => {
    this.setState({ dialogueOpenStatus: false });
  };

  editCustomer = () => {
    const updatedCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone
    };
    this.props.editCustomer(this.props.link, updatedCustomer);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.dialogueOpenStatus}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="firstname"
              label="First Name"
              value={this.state.firstname}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="lastname"
              label="Last Name"
              value={this.state.lastname}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="streetaddress"
              label="Street Address"
              value={this.state.streetaddress}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="postcode"
              label="Postcode"
              value={this.state.postcode}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="city"
              label="City"
              value={this.state.city}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="emailaddress"
              label="Email Address"
              value={this.state.email}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="phone"
              label="Phone"
              value={this.state.phone}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.editCustomer} color="default">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
