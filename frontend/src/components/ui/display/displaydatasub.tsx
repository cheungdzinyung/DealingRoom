// Importing modules from library
import * as React from "react";
import QR from 'src/components/assets/images/qr/homepage.jpg';

export class DisplayDataSub extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-sub-container">
        <img src={QR} className="display-data-sub-image"/>
      </div>
    );
  }
}
