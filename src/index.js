import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import App from "./App";
import Calendar from "./calendar/Calendar";
import Header from "./Header";
import "./index.css";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => (
          <Header>
            <App />
          </Header>
        )}
      />
      <Route
        path="/calendar"
        render={() => (
          <Header>
            <Calendar />
          </Header>
        )}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
