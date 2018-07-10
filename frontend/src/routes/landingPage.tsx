import * as React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPageNew from "src/Page/LandingPage/LandingPage";

export default class LandingPageRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/landing" exact={true} component={LandingPageNew} />
        <Route path="/" component={LandingPageNew} />
      </Switch>
    );
  }
}