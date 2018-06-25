// Importing modules
import * as React from "react";

// Import util function
import { firstLetterCaps } from "src/util/utility";

export interface ItemModalStatusProps {
  categories: string[];
  setCategories: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


export default class ItemModalStatus extends React.Component<ItemModalStatusProps> {
  constructor(props: ItemModalStatusProps) {
    super(props);
  }


  public render() {
    return (
      <div className="edit-item-status">
        <select
          className="filter-select rd-corner"
          defaultValue="beer"
          onChange={this.props.setCategories}
        >
          {
            this.props.categories.map((category, index) => (
              <option key={index} value={category}>{firstLetterCaps(category)}</option>
            ))
          }
        </select>

      </div>
    );
  }
}

