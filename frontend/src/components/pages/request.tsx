// Importing modules
import { Button, Card, Elevation, Intent } from "@blueprintjs/core";

// import { Example, handleStringChange, IExampleProps } from "@blueprintjs/docs-theme";
import * as React from "react";

// import redux and friends
import { connect } from "react-redux";
import { IRootState } from "../reducers/index";
import { removeFromCurrentOrder } from "../actions/actions_orders";

// Importing components
import OrderBanner from "../share/orderbanner";
import Usermenu from "../share/usermenu";

// Importing static assets
// import checkIcon from "../../icons/check.svg";
import headerImg from "../../icons/orders.svg";

// Importing fake data
// import { requestList } from "../fakedata";

// TODO?: change type into custom type
interface IItem {
  thisItemID: string,
  uniqueID: string,
  name: string,
  ice: string,
  sweetness: string,
  garnish: string,
  purchasePrice: number,
}

interface IRequestProps {
  currentOrder: IItem[],
  currentTotal: number,
  removeFromCurrentOrder: (thisItemID: string) => void,
}

class PureRequest extends React.Component<IRequestProps, {}> {
  constructor(props: IRequestProps) {
    super(props);
  }

  public removeFromCurrentOrder = (e: React.MouseEvent<HTMLDivElement>) => {
    const thisItemID = e.currentTarget.dataset.thisitemid;
    if (thisItemID !== undefined) {
      this.props.removeFromCurrentOrder(thisItemID);
    }
  }

  public confirmOrder = () => {
    // TODO : post current order to server
    return null;
  }

  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} />
        {this.props.currentOrder.map((item, i) => (
          <Card key={i}
            className="request-line"
            interactive={true}
            elevation={Elevation.TWO}
            onClick={this.removeFromCurrentOrder}
            data-thisitemid={item.thisItemID}
          >
            <span className="line-item">{item.name}</span>
            <Button icon="menu" intent={Intent.DANGER} className="extra-mod" minimal={true} />
          </Card>
        ))}
        <Card
          className="request-summary"
          elevation={Elevation.TWO}
        >
          <div className="request-top">
            <h3 className="request-header">Total Amount:</h3>
            <span className="request-amount">${this.props.currentTotal}</span>
          </div>
          
          {/*hide button when list is empty*/}
          {(this.props.currentOrder.length === 0) ? <div /> :
            <div>
              <hr />
              <button className="confirm-button" onClick={this.confirmOrder}>
                <span>Confirm Order</span>
              </button>
            </div>
          }
        </Card>
        <Usermenu />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    currentOrder: state.orders.currentOrder,
    currentTotal: state.orders.currentTotal,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFromCurrentOrder: (thisItemID: string) => {
      dispatch(removeFromCurrentOrder(thisItemID));
    }
  }
}

const Request = connect(mapStateToProps, mapDispatchToProps)(PureRequest);

export default Request