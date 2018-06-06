import * as React from "react";
import OrderBanner from "../share/orderBanner";
import Usermenu from "../share/usermenu";

import headerImg from "../../icons/orders.svg";

interface IOrder {
  orderNumber: number
  amount: number
  orderTime: number
  isPaid: boolean
}

interface IOrdersProps{
  listOfOrder: IOrder[]
}


export default class Orders extends React.Component<IOrdersProps> {
  constructor(props: IOrdersProps) {
    super(props);
  }
  public render() {
    return (
      <div className="page-content-container">
        <OrderBanner displayName="Ivan" tableNumber={3} image={headerImg} status="Order" statusNumber={1326} />

        <div className="cards">
          <div className="top">
            <div className="order-details">
              <h1>
                Order #{1234}
              </h1>
              <p>Total Amount: ${140.29}</p>
              <p>Ordering time: {1530}</p>
            </div>
            <img src="" className="order-icon" alt="" />
          </div>

          <hr />
          
        </div>
        <Usermenu />
      </div>
    );
  }
}
