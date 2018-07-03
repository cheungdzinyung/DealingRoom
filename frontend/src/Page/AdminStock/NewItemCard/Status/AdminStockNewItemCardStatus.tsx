// Importing modules
import * as React from "react";

// Importing static asset
import solidStar from "./img/starfilled.svg";
import hollowStar from "./img/starunfilled.svg";
// Import util function
import { firstLetterCaps } from "src/util/utility";

export interface ItemModalStatusProps {
  categories: string[];
  isActive: boolean;
  isSpecial: boolean;
  setCategories: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleActive: () => void;
  toggleSpecial: () => void;
}

export default class ItemModalStatus extends React.Component<
  ItemModalStatusProps
> {
  constructor(props: ItemModalStatusProps) {
    super(props);
  }

  public render() {
    return (
      <div className="edit-item-status">
        <select
          className="edit-item-filter-select rd-corner"
          defaultValue="beer"
          onChange={this.props.setCategories}
        >
          {this.props.categories.map((category, index) => (
            <option key={index} value={category}>
              {firstLetterCaps(category)}
            </option>
          ))}
        </select>
        <div
          onClick={this.props.toggleSpecial}
          className="edit-item-star-container"
        >
          <img
            src={this.props.isSpecial === true ? solidStar : hollowStar}
            alt=""
            className="edit-item-star-img"
          />
        </div>
        <button
          onClick={this.props.toggleActive}
          className={
            this.props.isActive
              ? "edit-item-status-switch-green"
              : "edit-item-status-switch-red"
          }
        >
          {this.props.isActive === true ? "Active" : "Inactive"}
        </button>
      </div>
    );
  }
}
