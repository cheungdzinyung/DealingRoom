// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./DisplayCategoryList.scss";
import QR from "./img/qrcode.jpg";

export class DisplayCategoryList extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-sub-container">
        <img src={QR} className="display-data-sub-image" />
      </div>
    );
  }
}
