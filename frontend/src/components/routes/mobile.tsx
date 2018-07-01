import * as React from "react";
import { Switch, Route } from "react-router-dom";
// import { AnimatedRoute } from 'react-router-transition';
// tslint:disable-next-line:no-var-requires
// const AnimatedRoute = require("react-router-transition");

import Initialize from "src/components/container/mobile/initialize";
import Login from "src/components/container/mobile/login";
import Menu from "src/components/container/mobile/menu";
import Order from "src/components/container/mobile/order";
import OrderList from "src/components/container/mobile/orderlist";
import Performance from "src/components/container/mobile/profile";
import Request from "src/components/container/mobile/request";
import Setting from "src/components/container/mobile/setting";

export default class MobileRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/customer" exact={true} component={Login} />
        <Route path="/customer/initialize" component={Initialize} />
        <Route path="/customer/performance" component={Performance} />
        <Route path="/customer/order" exact={true} component={OrderList} />
        <Route path="/customer/order/:orderId" component={Order} />
        <Route path="/customer/menu" component={Menu} />
        <Route path="/customer/request" component={Request} />
        <Route path="/customer/setting" component={Setting} />
        <Route path="/customer/request" component={Request} />
      </Switch>
    );
  }
}
