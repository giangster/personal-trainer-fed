import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import Calendar from "./components/calendar/Calendar";
import Header from "./Header";
import LogIn from "./components/login/LogInPage";
import "./index.css";
import * as firebaseui from "firebaseui";

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
      <Route
        path="/login"
        render={() => (
          <Header>
            <LogIn />
          </Header>
        )}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);
