// Importing modules
import * as React from "react";

export interface IItemModalInfoProps {
  itemName: string;
  itemStock: number;
  minimumPrice: number;
  currentPrice: number;
  setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStock: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMinimunPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default class ItemModalInfo extends React.Component<IItemModalInfoProps> {
  constructor(props: IItemModalInfoProps) {
    super(props);
  }


  public render() {
    return (
      <div className="edit-item-info-container">
        <input defaultValue={this.props.itemName} onChange={this.props.setName} className="edit-item-info-name" />
        <hr className="edit-item-info-breakline" />
        <div className="edit-item-value-container">
          <div className="edit-item-value-line-container">
            <span className="edit-item-value-line-text warning">Current Price</span>
            <div className="line-number-container"><span>&#36;</span>
              <input type="number" defaultValue={this.props.currentPrice.toString()} onChange={this.props.setCurrentPrice} className="edit-item-value-line-numbers" />
            </div>
          </div>
          <div className="edit-item-value-line-container">
            <span className="edit-item-value-line-text alert">Price Floor</span>
            <div className="line-number-container"><span>&#36;</span>
              <input type="number" defaultValue={this.props.minimumPrice.toString()} onChange={this.props.setMinimunPrice} className="edit-item-value-line-numbers" />
            </div>
          </div>
          <div className="edit-item-value-line-container">
            <span className="edit-item-value-line-text info">Quantity</span>
            <div className="line-number-container">
              <input type="number" defaultValue={this.props.itemStock.toString()} onChange={this.props.setStock} className="edit-item-value-line-numbers" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
