import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./App/pages/landing";
import Dashboard from "./App/dashboard/dashboard";
import NinjaSignup from "./App/dashboard/signups/ninja-signup";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

function authorized() {
  if (sessionStorage.getItem("id") === null) {
    return false;
  } else {
    console.log("it redirected");
    return true;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authorized() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Content = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/ninjasignup" component={NinjaSignup} />
  </Switch>
);
export default App;
