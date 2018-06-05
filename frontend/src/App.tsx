import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

import Display from "./components/pages/display"
import Login from "./components/pages/login";
import Menu from "./components/pages/menu";
import Order from "./components/pages/orders";
import Payment from "./components/pages/payment";
import Profile from "./components/pages/profile";
import Setting from "./components/pages/setting";

class App extends React.Component {
  public render() {
    return (

      <div className="full-page">
        {/* TODO: To move each page container into common space */}
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/order" component={Order} />
          <Route path="/menu" component={Menu} />
          <Route path="/payment" component={Payment} />
          <Route path="/setting" component={Setting} />
          <Route path="/display" component={Display} />
        </Switch>
      </div>

    );
  }
}

export default App;
