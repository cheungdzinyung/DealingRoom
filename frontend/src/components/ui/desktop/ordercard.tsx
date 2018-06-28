// Importing modules
import * as React from "react";
import { OrderStatus, IOrderItemWithMod } from "src/modules";

interface IOrderCardProps {
    orders_id: number;
    users_id: number;
    displayName: string;
    table: number;
    status: OrderStatus;
    isPaid?: boolean;
    order: IOrderItemWithMod[];
    confirmMade?: (ordersId: number) => void;
    confirmServed?: (ordersId: number) => void;
}
export default class OrderCard extends React.Component<IOrderCardProps> {
    constructor(props: IOrderCardProps) {
        super(props)
    }

    public made = () => {
        if (this.props.confirmMade !== undefined) {
            this.props.confirmMade(this.props.orders_id);
        }
    }

    public served = () => {
        if (this.props.confirmServed !== undefined) {
            this.props.confirmServed(this.props.orders_id);
        }
    }

    public componentDidUpdate () {
        this.render();
    }

    public render() {
        return (
            <div className="order-card-container">
                <div className="order-header-container">
                    <span className="order-id">#{this.props.orders_id}</span>
                    <div className="order-button">
                        {   // it is either 
                            (this.props.status === "confirmed")
                            ?   <button className="order-status-display" onClick={this.made}>
                                {/* <span className="button-order-text">To Be {this.props.status}</span> */}
                                    <span className="button-order-text">To Make</span>
                                </button>
                            :   <button className="order-status-display" onClick={this.served}>
                                {/* <span className="button-order-text">To Be {this.props.status}</span> */}
                                    <span className="button-order-text">To Serve</span>
                                </button>
                        }

                        {/* { (this.props.isPaid === !undefined) &&
                        <div className="payment-status">
                            { this.props.isPaid === true ?
                                <span className="order-payment-status-paid">paid</span> :
                                <span className="order-payment-status-unpaid">unpaid</span>
                            }
                        </div>} */}
                        
                    </div>
                </div>
                <div className="order-item-container">
                    {this.props.order.map((item, index) => (
                        <div className="order-item-line" key={index}>
                            <div className="order-item-name-container">
                                <span className="order-item-name">{item.itemName}</span>
                            </div>
                            <div className="item-mods-container">
                                <div className="mods-icon">I</div>
                                <div className="mods-icon">S</div>
                                <div className="mods-icon">G</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

