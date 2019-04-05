import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class CustomerTraining extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 1, training: [] };
  }
  componentDidMount = () => {
    this.trainingList(this.state.id);
  };

  trainingList = id => {
    fetch(`https://customerrest.herokuapp.com/api/customers/${id}/training`)
      .then(responseData => responseData.json())
      .then(responseData =>
        this.setState({ training: responseData.content, id: id + 1 })
      )
      .catch(err => console.error(err));
  };
  render() {
    const columns = [{ Header: "date", accessor: "date" }];
    return (
      <div>
        <h2>Training Record</h2>
        <ReactTable data={this.state.training} columns={columns} />
      </div>
    );
  }
}
