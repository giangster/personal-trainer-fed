import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import Moment from "moment";
import DeleteTraining from "./DeleteTraining";
import AddTraining from "./AddTraining";
import GetAllTrainings from "./GetAllTrainings";

export default class CustomerTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      training: [],
      messageOpenStatus: false,
      message: ""
    };
  }

  componentDidMount = () => {
    this.trainingList(this.state.url);
  };

  trainingList = url => {
    fetch(url)
      .then(responseData => responseData.json())
      .then(responseData => this.setState({ training: responseData.content }))
      .catch(err => console.error(err));
  };

  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings", { method: "GET" })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  addTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(training)
    })
      .then(res => this.trainingList(this.state.url))
      .then(res =>
        this.setState({
          messageStatusOpen: true,
          message: "New training added sucessfully!"
        })
      )
      .catch(err => console.error(err));
  };

  deleteTraining = link => {
    fetch(link, { method: "DELETE" })
      .then(res => this.trainingList(this.state.url))
      .then(res =>
        this.setState({
          messageOpenStatus: true,
          message: "Training deleted sucessfully!"
        })
      )
      .catch(err => console.error(err));
  };

  render() {
    const columns = [
      {
        Header: "Date",
        id: "date",
        accessor: trainingItem => {
          if (trainingItem.date !== undefined) {
            return Moment(trainingItem.date)
              .local()
              .format("DD-MM-YYYY");
          } else {
            return "";
          }
        }
      },
      { Header: "Duration", accessor: "duration" },
      { Header: "Activity", accessor: "activity" },

      {
        Header: "",
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <DeleteTraining
            deleteTraining={this.deleteTraining}
            link={value}
            training={this.state.training}
          />
        )
      }
    ];
    return (
      <div>
        <br />
        <div style={{ display: "inline-block", margin: 10 }}>
          <AddTraining addTraining={this.addTraining} url={this.state.url} />
        </div>
        <div style={{ display: "inline-block", margin: 10 }}>
          <GetAllTrainings getAllTrainings={this.getAllTrainings} />
        </div>
        <h2>Training Record</h2>
        <ReactTable data={this.state.training} columns={columns} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.messageOpenStatus}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={this.state.message}
        />
      </div>
    );
  }
}
