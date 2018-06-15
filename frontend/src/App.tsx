import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

import Display from "./components/pages/display";
import Login from "./components/pages/login";
import Menu from "./components/pages/menu";
import Order from "./components/pages/order";
import OrderList from "./components/pages/orderlist";
import Profile from "./components/pages/profile";
import Request from "./components/pages/request";
import Setting from "./components/pages/setting";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "src/components/reducers/index";
import { getentireMenu } from "src/components/actions/actions_orders";

interface IAppProps {
  getentireMenu: () => void,
}

class PureApp extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  // will mount get all items
  public componentDidMount(){
    this.props.getentireMenu();
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {};
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getentireMenu: () => {
      dispatch(getentireMenu());
    },
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default App;
