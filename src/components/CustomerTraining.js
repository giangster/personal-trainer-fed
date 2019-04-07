import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";

export default class CustomerTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { url: this.props.url, training: [] };
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
      { Header: "Activity", accessor: "activity" }
    ];
    return (
      <div>
        <h2>Training Record</h2>
        <ReactTable data={this.state.training} columns={columns} />
      </div>
    );
  }
}
