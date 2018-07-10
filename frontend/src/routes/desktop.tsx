import * as React from "react";
import { Switch, Route } from "react-router-dom";

import AdminLogin from "src/Page/AdminLogin/AdminLogin";
import StockManagement from "src/Page/AdminStock/AdminStock";
import Initialize from "src/Page/AdminInitialize/AdminInitialize";
import SpecialEvent from "src/Page/AdminSpecialEvent/AdminSpecialEvent";
import CurrentOrders from "src/Page/AdminCurrentOrders/AdminCurrentOrders";
import PendingOrders from "src/Page/AdminPendingOrders/AdminPendingOrders";
import UnpaidOrders from "src/Page/AdminUnpaidOrders/AdminUnpaidOrders";

export default class DesktopRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path="/admin/initializeStaff" component={Initialize} />
        <Route exact={true} path="/admin/stock" component={StockManagement} />
        <Route exact={true} path="/admin/specialEvent" component={SpecialEvent} />
        <Route exact={true} path="/admin/currentorders" component={CurrentOrders} />
        <Route exact={true} path="/admin/pendingorders" component={PendingOrders} />
        <Route exact={true} path="/admin/unpaidorders" component={UnpaidOrders} />
        <Route path="/admin" component={AdminLogin} />
      </Switch>
    );
  }
}
