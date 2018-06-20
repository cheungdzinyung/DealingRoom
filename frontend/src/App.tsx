import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

import Display from "./components/pages/display/display";
import Initialize from "./components/pages/mobile/initialize";
import Login from "./components/pages/mobile/login";
import Menu from "./components/pages/mobile/menu";
import Order from "./components/pages/mobile/order";
import OrderList from "./components/pages/mobile/orderlist";
import Profile from "./components/pages/mobile/profile";
import Request from "./components/pages/mobile/request";
import Setting from "./components/pages/mobile/setting";

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
