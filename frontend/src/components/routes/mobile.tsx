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
import Profile from "src/components/container/mobile/profile";
import Request from "src/components/container/mobile/request";
import Setting from "src/components/container/mobile/setting";

export default class MobileRoutes extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/order" exact={true} component={OrderList} />
        <Route path="/order/:orderId" component={Order} />
        {/* <AnimatedRoute path="/order/:orderId" component={Order} /> */}
        <Route path="/menu" component={Menu} />
        {/* <AnimatedRoute
          path="/menu"
          component={Menu}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          // tslint:disable-next-line:jsx-no-lambda
        //   mapStyles={styles => ({
        //     transform: `translateX(${styles.offset}%)`
        //   })}
        /> */}
        <Route path="/request" component={Request} />
        <Route path="/setting" component={Setting} />
        <Route path="/request" component={Request} />
        <Route path="/initialize" component={Initialize} />
      </Switch>
    );
  }
}
