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
      <div className="page-content-container">
        <Banner header="Payment" image={headerImg} />
        <h1>Hi</h1>
        <Usermenu />
      </div>
    );
  }
}
