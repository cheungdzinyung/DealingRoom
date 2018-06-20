import * as React from "react";

// importing UI elements
import { Card, Elevation } from "@blueprintjs/core";

// import static icons
import wallet from "../icons/item/wallet.svg";
import info from "../icons/item/info.svg";
import up from "../icons/item/up.svg";
// import down from "../icons/item/down.svg";
import plus from "../icons/item/plus.svg";

interface IMenuItemProps {
  key: number;
  itemName: string;
  price: number;
  priceDelta: number;
  details: string;
  image: "*.jpg" | "*.png" | "*.jpeg";
  detailIsOpen: boolean;
  
}

export default class MenuItem extends React.Component<IMenuItemProps> {
  constructor(props: IMenuItemProps) {
    super(props);
  }
  public render() {
    return (
      <div className="menu-item-container">
        <Card
          className="menu-item-card rd-corner"
          interactive={true}
          elevation={Elevation.ONE}
          key={this.props.key}
        >
          {/* Absolute location */}
          {/* Product images */}
          <img src={this.props.image} className="menu-item-img" alt="" />
          {/* Info button  */}
          <img className="item-info" src={info} alt="" />
          <img className="add-item" src={plus} alt="" />
          <span className="menu-item-name">{this.props.itemName}</span>
          <div className="menu-item-bot">
            {/* Divider */}
            <hr className="item-split" />
            {/* Bottom part of the card */}
            <div className="item-fluctuation">
              <div className="item-flucutation-container">
                <img className="flux-img" src={wallet} alt="" />
                <span className="item-fluctuation-display">
                  &#36;{this.props.price}
                </span>
              </div>
              <div className="item-flucutation-container">
                <img className="flux-img" src={up} alt="" />
                <span className="item-fluctuation-display">
                  {this.props.priceDelta}%
                </span>
              </div>
            </div>
          </div>
        </Card>
        {/* <Collapse className="item-detail-collapse" isOpen={this.props.detailIsOpen}>

        </Collapse> */}
      </div>
    );
  }
}
