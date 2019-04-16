import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "moment";

export default class GetAllTrainings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTraining: []
    };
  }

  componentDidMount() {
    this.getAllTrainings();
  }

  getAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(response => this.setState({ allTraining: response }))
      .catch(err => console.error(err));
  };

  trainingList = () => {
    this.props.trainingList(this.props.url);
  };

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
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
      { Header: "Customer ID", accessor: "customer.id" },
      { Header: "First Name", accessor: "customer.firstname" },
      { Header: "Last Name", accessor: "customer.lastname" },
      { Header: "Address", accessor: "customer.streetaddress" },
      { Header: "Postcode", accessor: "customer.postcode" },
      { Header: "City", accessor: "customer.city" },
      { Header: "Email", accessor: "customer.email" },
      { Header: "Phone", accessor: "customer.phone" }
    ];

    return (
      <div>
        <Button
          style={{ display: "inline-block", margin: 10 }}
          variant="outlined"
          onClick={this.trainingList}
        >
          &laquo; Back
        </Button>
        <ReactTable
          data={this.state.allTraining}
          columns={columns}
          sortable={true}
          filterable={true}
          defaultFilterMethod={this.filterMethod}
        />
      </div>
    );
  }
}
