import * as React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "src/Page/LandingPage/LandingPage";

export default class LandingPageRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
      </Switch>
    );
  }
}