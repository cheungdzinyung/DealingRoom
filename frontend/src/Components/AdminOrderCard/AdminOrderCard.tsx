// Importing modules
import * as React from "react";
import { OrderStatus, IOrderItemWithMod } from "src/modules";

// Importing styling and static assets
import "./AdminOrderCard.scss";

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
    paymentPage?: boolean;
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

    public componentDidUpdate() {
        this.render();
    }

    public button = () => {
        if (this.props.paymentPage !== true) {
            if (this.props.status === "confirmed") {
                return (
                    <button className="order-status-display" onClick={this.made}>
                        <span className="button-order-text">To Make</span>
                    </button>
                )
            } else {
                return (
                    <button className="order-status-display" onClick={this.served}>
                        <span className="button-order-text">To Serve</span>
                    </button>
                )
            }
        } else {
            return (
                <button className="order-status-display">
                    <span className="button-order-text">
                        To Collect ${this.props.order.reduce((accu, curr) => (accu + parseFloat(curr.purchasePrice)), 0).toFixed(2)}
                    </span>
                </button>
            )
        }
    }

    public content = () => {
        if (this.props.paymentPage !== true) {
            return (
                this.props.order.map((item, index) => (
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
                ))
            )
        } else {
            return (
                // change to price  
                this.props.order.map((item, index) => (
                    <div className="order-item-line" key={index}>
                        <div className="order-item-name-container">
                            <span className="order-item-name">{item.itemName}</span>
                        </div>
                        <div className="item-mods-container">
                            <div className="mods-icon">{item.purchasePrice}</div>
                        </div>
                    </div>
                ))
            )
        }
    }

    public render() {
        return (
            <div className="order-card-container">
                <div className="order-header-container">
                    <span className="order-id">#{this.props.orders_id}</span>
                    <div className="order-button">
                        {
                            this.button()
                        }
                    </div>
                </div>
                <div className="order-item-container">
                    {
                        this.content()
                    }
                </div>
            </div>
        )
    }

}

