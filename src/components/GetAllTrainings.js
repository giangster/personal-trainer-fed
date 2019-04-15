import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class GetAllTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTraining: [],
      _isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ _isMounted: true });
  }

  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(response => this.setState({ allTraining: response }))
      .catch(err => console.error(err));
  };

  componentWillUnmount = () => {
    this.setState({ _isMounted: false });
    this.props.componentDidMount();
  };

  render() {
    const columns = [
      { Header: "Date", accessor: "date" },
      { Header: "Duration", accessor: "duration" },
      { Header: "Activity", accessor: "activity" },
      { Header: "Customer ID", accessor: "customer.id" },
      { Header: "First Name", accessor: "customer.firstname" }
    ];

    console.log(this.state.allTraining);

    return (
      <div>
        <Button
          style={{ display: "inline-block", margin: 10 }}
          variant="outlined"
          onClick={this.componentWillUnmount}
        >
          &laquo; Backkk
        </Button>
        <ReactTable data={this.state.allTraining} columns={columns} />
      </div>
    );
  }
}
