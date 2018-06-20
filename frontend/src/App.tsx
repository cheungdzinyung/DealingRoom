import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

import Display from "./components/container/display/display";
import Initialize from "./components/container/mobile/initialize";
import Login from "./components/container/mobile/login";
import Menu from "./components/container/mobile/menu";
import Order from "./components/container/mobile/order";
import OrderList from "./components/container/mobile/orderlist";
import Profile from "./components/container/mobile/profile";
import Request from "./components/container/mobile/request";
import Setting from "./components/container/mobile/setting";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "./redux/reducers/index";

// interface IAppProps {}

class PureApp extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="full-page">
        {/* TODO: To move each page container into common space */}
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route exact={true} path="/order" component={OrderList} />
          <Route path="/order/:orderId" component={Order} />
          <Route path="/menu" component={Menu} />
          <Route path="/request" component={Request} />
          <Route path="/setting" component={Setting} />
          <Route path="/display" component={Display} />
          <Route path="/request" component={Request} />
          <Route path="/initialize" component={Initialize} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {};
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

const App = connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default App;
