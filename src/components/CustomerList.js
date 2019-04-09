import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./AddCustomer";
import CustomerTraining from "./CustomerTraining";
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      customers: [],
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
    fetch(link, { method: "DELETE" })
      .then(res => this.listCustomer())
      .then(res =>
        this.setState({
          messageOpenStatus: true,
          message: "Customer deleted sucessfully!"
        })
      )
      .catch(err => console.error(err));
  };

  editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCustomer)
    })
      .then(res => this.listCustomer())
      .then(res =>
        this.setState({
          messageOpenStatus: true,
          message: "Customer updated sucessfully!"
        })
      )
      .catch(err => console.error(err));
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
    this.setState({ messageOpenStatus: false });
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
        Header: "Training record",
        accessor: "links[2].href",
        Cell: ({ value, row }) => (
          <Button
            variant="outlined"
            color="default"
            onClick={() => this.trainingList(value)}
          >
            Show
          </Button>
        )
      },
      {
        Header: "",
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <EditCustomer
            editCustomer={this.editCustomer}
            customer={row}
            link={value}
          >
            Edit
          </EditCustomer>
        )
      },
      {
        Header: "",
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <DeleteCustomer deleteCustomer={this.deleteCustomer} link={value} />
        )
      }
    ];
    return (
      <div>
        {this.state.isCustomerList && (
          <div>
            <AddCustomer addCustomer={this.addCustomer} />
            <br />
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
              open={this.state.messageOpenStatus}
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
            <Button variant="outlined" onClick={this.customerList}>
              Back
            </Button>
            <CustomerTraining url={this.state.url} />
          </div>
        )}
      </div>
    );
  }
}

export default CustomerList;
