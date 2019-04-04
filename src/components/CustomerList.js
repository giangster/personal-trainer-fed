import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 1, customers: [], training: [] };
  }

  componentDidMount = () => {
    this.listCustomer();
  };

  listCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(responseData => responseData.json())
      .then(responseData => this.setState({ customers: responseData.content }))
      .catch(err => console.error(err));
  };

  render() {
    const columns = [
      { Header: "First name", accessor: "firstname" },
      { Header: "Last name", accessor: "lastname" },
      { Header: "Street address", accessor: "streetaddress" },
      { Header: "Postcode", accessor: "postcode" },
      { Header: "City", accessor: "city" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" }
    ];
    return (
      <div>
        <h2>Customer List</h2>
        <ReactTable
          data={this.state.customers}
          columns={columns}
          sortable={true}
          filterable={true}
        />
      </div>
    );
  }
}
