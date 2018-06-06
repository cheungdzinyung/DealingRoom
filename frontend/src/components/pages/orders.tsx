import * as React from "react";
import OrderBanner from "../share/orderBanner";
import Usermenu from "../share/usermenu";

import headerImg from "../../icons/orders.svg";

export default class Orders extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} status="Order" statusNumber={1326} />
        
        <Usermenu />
      </div>
    );
  }
}
