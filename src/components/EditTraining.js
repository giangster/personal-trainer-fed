import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class EditTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      duration: "",
      activity: "",
      dialogueOpenStatus: false
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({
      date: this.props.training.date,
      duration: this.props.training.duration,
      activity: this.props.training.activity,
      dialogueOpenStatus: true
    });
  };

  handleClose = () => {
    this.setState({ dialogueOpenStatus: false });
  };

  editTraining = () => {
    const newTraining = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity
    };
    this.props.editTraining(this.props.link, newTraining);
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
          <DialogTitle id="form-dialog-title">Edit Training</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="date"
              label="Date"
              value={this.state.date}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="duration"
              label="Duration"
              value={this.state.duration}
              fullWidth
            />
            <TextField
              onChange={this.changeHandler}
              autoFocus
              margin="dense"
              id="activity"
              label="Activity"
              value={this.state.activity}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={this.editTraining} color="default">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
