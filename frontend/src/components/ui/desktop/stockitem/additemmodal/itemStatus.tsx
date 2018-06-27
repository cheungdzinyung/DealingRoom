// Importing modules
import * as React from "react";

// Importing static asset
import solidStar from "src/components/assets/icons/desktop/stocklist/starfilled.svg";
import hollowStar from "src/components/assets/icons/desktop/stocklist/starunfilled.svg";
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
          className="edit-item-status-switch"
        >
          {this.props.isActive === true ? "Active" : "Inactive"}
        </button>
      </div>
    );
  }
}
