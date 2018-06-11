// Importing modules
import { Card, Elevation } from "@blueprintjs/core";
import * as React from "react";

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
import { requestList } from "../fakedata";

interface IPureItem {
  itemName: string;
  // TODO: change type into custom type
  ice: string;
  sweetness: string;
  garnish: string;
  purchasePrice: number;
}

interface IPureRequestState {
  request: IPureItem[];
}

export default class Request extends React.Component<{}, IPureRequestState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      request: []
    };
  }

  public componentDidMount() {
    this.setState({
      request: requestList
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
            <h3 className="line-item">{line.itemName}</h3>
          </Card>
        ))}

        <Usermenu />
      </div>
    );
  }
}
