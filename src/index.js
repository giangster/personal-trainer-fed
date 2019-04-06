import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import CustomerList from "./components/CustomerList";
import CustomerTraining from "./components/CustomerTraining";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/CustomerList" component={CustomerList} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
