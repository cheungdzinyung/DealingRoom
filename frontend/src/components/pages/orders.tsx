import * as React from "react";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

import headerImg from "../../icons/orders.svg";

export default class Orders extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <Banner header="Orders" image={headerImg} />
        <h1>OMG</h1>
        <Usermenu />
      </div>
    );
  }
}
