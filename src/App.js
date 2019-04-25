import React, { Component } from "react";
import "./App.css";
import CustomerList from "./components/home/CustomerList";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Calendar from "./components/calendar/Calendar";
import Header from "./Header";
import LogIn from "./components/login/Login";
import "./index.css";
import HomePage from "./HomePage";
import { firebaseAuth } from "./config";

const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false };
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      } else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <Header>
                  <HomePage />
                </Header>
              )}
            />
            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/database"
              render={() => (
                <Header isAuthenticated={this.state.isAuthenticated}>
                  <CustomerList />
                </Header>
              )}
            />
            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/calendar"
              render={() => (
                <Header isAuthenticated={this.state.isAuthenticated}>
                  <Calendar />
                </Header>
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Header isAuthenticated={this.state.isAuthenticated}>
                  <LogIn />
                </Header>
              )}
            />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
