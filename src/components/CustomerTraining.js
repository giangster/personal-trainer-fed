import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class CustomerTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.id, training: [] };
  }
  componentDidMount = () => {
    this.trainingList(this.props.id);
  };

  trainingList = id => {
    fetch(`https://customerrest.herokuapp.com/api/customers/${id}/training`)
      .then(responseData => responseData.json())
      .then(responseData => this.setState({ training: responseData.content }))
      .catch(err => console.error(err));
  };
  render() {
    const columns = [
      { Header: "Date", accessor: "date" },
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
