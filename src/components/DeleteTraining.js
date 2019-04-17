import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class DeleteTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  deleteTraining = () => {
    this.props.deleteTraining(this.props.link);
    this.handleClose();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {this.props.training.length !== 0 && (
          <div>
            <Button
              color="default"
              onClick={this.handleClickOpen}
              style={{
                background:
                  "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%"
              }}
            >
              Delete
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Delete Training</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this training record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  No
                </Button>
                <Button
                  onClick={this.deleteTraining}
                  color="secondary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>{" "}
          </div>
        )}
      </div>
    );
  }
}
