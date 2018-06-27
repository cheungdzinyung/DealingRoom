// Importing modules
import * as React from "react";
import { OrderStatus, IItemWithMod } from "src/modules";

interface IOrderCardProps {
    users_id: number;
    userName: string;
    displayName: string;
    orders_id: number;
    table: number;
    status: OrderStatus;
    isPaid?: boolean;
    orderTotal: number;
    orderItems: IItemWithMod[];
}
export default class OrderCard extends React.Component<IOrderCardProps> {
    constructor(props: IOrderCardProps) {
        super(props)
    }
    
    public render() {
        return (
            <div className="order-card-container">
                <div className="order-header-container">
                    <span className="order-id">#{this.props.orders_id}</span>
                    <div className="order-button">
                        <button className="order-status-display">
                            <span className="button-order-text">{this.props.status}</span>
                        </button>
                        { (this.props.isPaid === !undefined) &&
                        <div className="payment-status">
                            { this.props.isPaid === true ?
                                <span className="order-payment-status-paid">paid</span> :
                                <span className="order-payment-status-unpaid">unpaid</span>
                            }
                        </div>
                        }
                    </div>
                </div>
                <div className="order-item-container">
                    {this.props.orderItems.map((item, index) => (
                        <div className="order-item-line" key={index}>
                            <div className="order-item-name-container">
                                <span className="order-item-name">{item.itemName}</span>
                            </div>
                            <div className="item-mods-container">
                                <div className="mods-icon">1</div>
                                <div className="mods-icon">2</div>
                                <div className="mods-icon">3</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

