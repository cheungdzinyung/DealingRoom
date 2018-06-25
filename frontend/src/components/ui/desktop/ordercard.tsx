// Importing modules
import * as React from "react";
import { IOrder } from "src/modules";

export default class OrderCard extends React.Component<IOrder> {
    constructor(props: IOrder) {
        super(props)
    }
    public render() {
        return (
            <div className="order-card-container">
                <div className="order-header-container">
                    <span className="order-id">#{this.props.orders_id}</span>
                    <div className="order-button">
                        <button className="order-confirmed">
                            <span className="button-order-text">Done</span>
                        </button>
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

