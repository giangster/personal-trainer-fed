import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class GetAllTrainings extends Component {
  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.props.getAllTrainings}>
          See All Training
        </Button>
      </div>
    );
  }
}
