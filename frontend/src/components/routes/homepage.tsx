import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { LandingPage } from "../container/homepage/landingpage";

export default class HomepageRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={LandingPage} />
      </Switch>
    );
  }
}
