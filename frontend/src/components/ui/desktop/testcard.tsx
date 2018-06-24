// Importing modules
import * as React from "react";

import { Card, Collapse } from "@blueprintjs/core";

interface ITestCardProps {
  click: () => void;
}

interface ITestCardState {
  isOpen: boolean;
}
export default class TestCard extends React.Component<
  ITestCardProps,
  ITestCardState
> {
  constructor(props: ITestCardProps) {
    super(props);
  }
  public render() {
    return (
      <div className="test">
        <Card onClick={this.props.click} />
        <Collapse isOpen={this.state.isOpen} />
      </div>
    );
  }
}
