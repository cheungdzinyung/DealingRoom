import * as React from "react";
import { Switch, Route } from "react-router-dom";

import AdminLogin from "src/components/container/desktop/adminlogin";
import StockManagement from "src/components/container/desktop/stockmanagement";
import CurrentOrders from "src/components/container/desktop/currentorders";
import PendingOrders from "src/components/container/desktop/pendingorders";

export default class DesktopRoutes extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact={true} path="/admin/login" component={AdminLogin} />
                <Route exact={true} path="/admin/stock/" component={StockManagement} />
                <Route exact={true} path="/admin/currentorders" component={CurrentOrders} />
                <Route exact={true} path="/admin/pendingorders" component={PendingOrders} />
            </Switch>

        );
    }
}
