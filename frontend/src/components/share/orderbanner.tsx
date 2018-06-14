import * as React from "react";

interface IPureOrderBannerProps {
  displayName: string;
  tableNumber: number;
  image: any;
  status?: string;
  statusNumber?: number;
}

export default class OrderBanner extends React.Component<
  IPureOrderBannerProps
> {
  constructor(props: IPureOrderBannerProps) {
    super(props);
  }
  public render() {
    return (
      <div className="banner-container">
        <img className="banner-profile-img" src={this.props.image} alt="" />
        <div className="contain-info">
          <h4 className="info-text">Table #{this.props.tableNumber}</h4>
          <h3 className="info-text">Hi, {this.props.displayName}.</h3>
        </div>
        {this.props.status !== undefined && (
          <h2 className="status">
            {this.props.status} #{this.props.statusNumber}
          </h2>
        )}
      </div>
    );
  }
}
