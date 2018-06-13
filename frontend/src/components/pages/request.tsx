// Importing modules
import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

// import { Example, handleStringChange, IExampleProps } from "@blueprintjs/docs-theme";
import * as React from "react";


// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
// import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
import { requestList } from "../../fakedata";

interface IPureItem {
  itemName: string;
  // TODO: change type into custom type
  ice: string;
  sweetness: string;
  garnish: string;
  purchasePrice: number;
}

interface IPureRequestState {
  request: IPureItem[],
  total: number
}

export default class Request extends React.Component<{}, IPureRequestState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      request: [],
      total: 0
    };
  }

  public componentDidMount() {
    let totalAmount = 0;
    requestList.forEach((item) => totalAmount += item.purchasePrice)

    this.setState({
      request: requestList,
      total: totalAmount
    });
  }

  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} />
        {this.state.request.map((line, i) => (
          <Card key={i}
            className="request-line"
            interactive={true}
            elevation={Elevation.TWO}
          >
            <span className="line-item">{line.itemName}</span>
            <Button icon="menu" intent={Intent.DANGER} className="extra-mod" minimal={true} />
          </Card>
        ))}
        <Card
          className="request-summary"
          elevation={Elevation.TWO}
        >
          <div className="request-top">
            <h3 className="request-header">Total Amount:</h3>
            <span className="request-amount">${this.state.total}</span>
          </div>
          <hr />
          <button className="confirm-button">
            <span>Confirm Order</span>
          </button>
        </Card>
        <Usermenu />
      </div>
    );
  }
}
