import React, { Component } from "react";
import "./App.css";
import CustomerList from "./components/CustomerList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Personal Training
            </Typography>
          </Toolbar>
        </AppBar>
        <h1>Customer Database</h1>
        <CustomerList />
      </div>
    );
  }
}

export default App;
