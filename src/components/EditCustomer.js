import React, { Component } from "react";

export default class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: ""
    };
  }
  render() {
    return <div />;
  }
}
