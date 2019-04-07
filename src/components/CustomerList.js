import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./AddCustomer";
import CustomerTraining from "./CustomerTraining";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      customers: [],
      training: [],
      messageStatusOpen: false,
      isCustomerList: true,
      isTrainingList: false,
      url: ""
    };
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
          messageStatusOpen: true,
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
            messageStatusOpen: true,
            message: "Customer deleted sucessfully!"
          })
        )
        .catch(err => console.error(err));
    }
  };

  trainingList = url => {
    console.log(url);
    this.setState({
      ...this.state,
      isCustomerList: false,
      isTrainingList: true,
      url: url
    });
  };
  customerList = () => {
    this.setState({
      ...this.state,
      isCustomerList: true,
      isTrainingList: false
    });
  };
  handleClose = () => {
    this.setState({ messageStatusOpen: false });
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
        accessor: "links[2].href",
        Cell: ({ value, row }) => (
          <Button color="primary" onClick={() => this.trainingList(value)}>
            Show
          </Button>
        )
      }
    ];
    return (
      <div>
        {this.state.isCustomerList && (
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
              open={this.state.messageStatusOpen}
              autoHideDuration={3000}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={this.state.message}
            />
          </div>
        )}
        {this.state.isTrainingList && (
          <div>
            <Button onClick={this.customerList}>Back</Button>
            <CustomerTraining url={this.url} />
          </div>
        )}
      </div>
    );
  }
}

export default CustomerList;
