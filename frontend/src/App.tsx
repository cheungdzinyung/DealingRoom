import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

// Importing display containers
import Display from "./components/container/display/display";

// Importing mobile containers
import Initialize from "./components/container/mobile/initialize";
import Login from "./components/container/mobile/login";
import Menu from "./components/container/mobile/menu";
import Order from "./components/container/mobile/order";
import OrderList from "./components/container/mobile/orderlist";
import Profile from "./components/container/mobile/profile";
import Request from "./components/container/mobile/request";
import Setting from "./components/container/mobile/setting";

// Importing desktop containers
import AdminLogin from "./components/container/desktop/adminlogin";
import StockManagement from "./components/container/desktop/stockmanagement";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "./redux/store";

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
          {/* Routes to admin/desktop screens */}
          <Route exact={true} path="/admin/login" component={AdminLogin}/>
          <Route exact={true} path="/admin/stock" component={StockManagement}/>
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
