import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: "",
      duration: "",
      activity: "",
      customer: "",
      url: ""
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

  addTraining = () => {
    const newTraining = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer:
        window.location.href + "api/customers/" + this.props.url.match(/\d+/)[0]
    };
    this.props.addTraining(newTraining);
    this.handleClose();
  };

  render() {
    return (
      <div>
        {" "}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New training</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="duration"
              label="Duration"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="activity"
              label="Activity"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.addTraining} color="default">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          ADD TRAINING
        </Button>
      </div>
    );
  }
}
