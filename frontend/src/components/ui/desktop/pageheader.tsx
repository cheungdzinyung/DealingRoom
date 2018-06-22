// Importing modules
import * as React from "react";

interface IPageHeaderProps {
  header: string;
}

export default class PageHeader extends React.Component<IPageHeaderProps, {}> {
  constructor(props: IPageHeaderProps) {
    super(props);
  }

  public render() {
    return (
      <div className="header-container">
        <h1 className="header-text">{this.props.header}</h1>
      </div>
    );
  }
}
