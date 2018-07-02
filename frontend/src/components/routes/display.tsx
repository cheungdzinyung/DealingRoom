import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Display from "src/components/Page/Display/Display";

export default class DisplayRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/display" component={Display} />
      </Switch>
    );
  }
}
