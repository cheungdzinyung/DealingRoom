import * as React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/App.scss";

import Login from "./components/login";
import Profile from "./components/profile";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="full-page">
          <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
