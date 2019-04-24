import React, { Component } from "react";
import "./App.css";
import CustomerList from "./components/home/CustomerList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomerList />
      </div>
    );
  }
}

export default App;
