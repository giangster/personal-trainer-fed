import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import Moment from "moment";
import DeleteTraining from "./DeleteTraining";
import AddTraining from "./AddTraining";
import GetAllTrainings from "./GetAllTrainings";
import Button from "@material-ui/core/Button";

export default class CustomerTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      training: [],
      messageOpenStatus: false,
      message: "",
      isCustomerTraining: true,
      isAllTraining: false
    };
  }

  componentDidMount = () => {
    this.trainingList(this.state.url);
  };

  trainingList = url => {
    console.log("HEY HEY");
    fetch(url)
      .then(responseData => responseData.json())
      .then(responseData =>
        this.setState({
          training: responseData.content,
          isAllTraining: false,
          isCustomerTraining: true
        })
      )
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

  listAllTraining = () => {
    this.setState({
      ...this.state,
      isCustomerTraining: false,
      isAllTraining: true
    });
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
        {this.state.isAllTraining && (
          <div>
            <GetAllTrainings
              trainingList={this.trainingList}
              url={this.state.url}
            />
          </div>
        )}
        {this.state.isCustomerTraining && (
          <div>
            <br />
            <Button
              style={{ display: "block", margin: 10, position: "absolute" }}
              variant="outlined"
              onClick={this.props.customerList}
            >
              &laquo; Back
            </Button>
            <div style={{ display: "inline-block", margin: 10 }}>
              <AddTraining
                addTraining={this.addTraining}
                url={this.state.url}
              />
            </div>
            <div style={{ display: "inline-block", margin: 10 }}>
              <Button variant="outlined" onClick={this.listAllTraining}>
                Get All Training
              </Button>
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
            )}
          </div>
        )}
      </div>
    );
  }
}
