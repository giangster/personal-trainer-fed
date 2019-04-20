import React, { Component } from "react";
import "./App.css";
import CustomerList from "./components/CustomerList";
import SvgIcon from "@material-ui/core/SvgIcon";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Customer Database</h1>
        <CustomerList />
      </div>
    );
  }
}

export default App;
