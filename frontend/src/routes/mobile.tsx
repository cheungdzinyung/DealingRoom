import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Initialize from "src/Components/container/mobile/initialize";
import Login from "src/Components/container/mobile/login";
import Menu from "src/Components/container/mobile/menu";
import Order from "src/Components/container/mobile/order";
import OrderList from "src/Components/container/mobile/orderlist";
import Performance from "src/Components/container/mobile/profile";
import Request from "src/Components/container/mobile/request";
import Setting from "src/Components/container/mobile/setting";
import PureIntroduction from "src/Components/container/mobile/introduction";

export default class MobileRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        {/* Testing route */}
        <Route path="/customer/welcome" exact={true} component={PureIntroduction} />
        <Route path="/customer/initialize" exact={true} component={Initialize} />
        <Route path="/customer/performance" exact={true} component={Performance} />
        <Route path="/customer/order" exact={true} component={OrderList} />
        <Route path="/customer/order/:orderId" exact={true} component={Order} />
        <Route path="/customer/menu" exact={true} component={Menu} />
        <Route path="/customer/request" exact={true} component={Request} />
        <Route path="/customer/setting" exact={true} component={Setting} />
        <Route path="/customer/request" exact={true} component={Request} />
        <Route path="/customer" component={Login} />
      </Switch>
    );
  }
}
