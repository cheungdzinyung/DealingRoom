import * as React from "react";
import Banner from "../share/topbanner";
import Usermenu from "../share/usermenu";

import headerImg from "../../icons/credit.svg";

export default class Profile extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  public render() {
    return (
      <div className="userInterface">
        <Banner header="Payment" image={headerImg} />
        <div className="page-container">
          <div className="order-container">
            <h1>Hi</h1>
          </div>
        </div>
        <Usermenu />
      </div>
    );
  }
}
