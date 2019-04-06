import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import CustomerTraining from "./CustomerTraining";
import AddCustomer from "./AddCustomer";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", customers: [], training: [], open: false };
  }

  componentDidMount = () => {
    this.listCustomer();
  };

  addCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => this.listCustomer())
      .then(res =>
        this.setState({
          open: true,
          message: "New customer added sucessfully!"
        })
      )
      .catch(err => console.error(err));
  };

  listCustomer = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(responseData => responseData.json())
      .then(responseData => this.setState({ customers: responseData.content }))
      .catch(err => console.error(err));
  };

  deleteCustomer = link => {
    if (window.confirm("Are you sure?")) {
      fetch(link.original.links[0].href, { method: "DELETE" })
        .then(res => this.listCustomer())
        .then(res =>
          this.setState({
            open: true,
            message: "Customer deleted sucessfully!"
          })
        )
        .catch(err => console.error(err));
    }
  };

  onClickHandler = event => {
    let id = event.target.id + 4;
    this.trainingList(id);
  };

  trainingList = id => {
    console.log(id);
    return (
      <div>
        <CustomerTraining id={id} />
      </div>
    );
  };

  render() {
    const columns = [
      { Header: "First name", accessor: "firstname" },
      { Header: "Last name", accessor: "lastname" },
      { Header: "Street address", accessor: "streetaddress" },
      { Header: "Postcode", accessor: "postcode" },
      { Header: "City", accessor: "city" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      {
        Header: "",
        accessor: "links[0].href",
        Cell: value => (
          <Button color="primary" onClick={() => this.deleteCustomer(value)}>
            Delete
          </Button>
        )
      },
      {
        Header: "Training record",
        accessor: "links[1].href",
        Cell: ({ value, row }) => (
          <Button color="primary" onClick={() => this.onClickHandler}>
            Show
          </Button>
        )
      }
    ];
    return (
      <div>
        <AddCustomer addCustomer={this.addCustomer} />
        <hr />
        <ReactTable
          data={this.state.customers}
          columns={columns}
          sortable={true}
          filterable={true}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.open}
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
