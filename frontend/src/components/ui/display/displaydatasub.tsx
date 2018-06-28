// Importing modules from library
import * as React from "react";
import logo from 'src/components/assets/icons/all/logo.svg';

export class DisplayDataSub extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-sub-container">
        <img src={logo} className="display-data-sub-image"/>
      </div>
    );
  }
}
