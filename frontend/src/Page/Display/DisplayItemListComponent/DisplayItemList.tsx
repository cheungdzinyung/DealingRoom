// Importing modules from library
import * as React from "react";

// Importing styling and static assets
import "./DisplayItemList.scss"

// Importing interfaces from module
import { IMenuCategoryWithFlux } from "src/modules";

// Importing presentation components
import { DisplayItemListLine } from "./DisplayItemListLineComponent/DisplayItemListLine";

export class DisplayItemList extends React.Component<
IMenuCategoryWithFlux,
  {}
> {
  constructor(props: IMenuCategoryWithFlux) {
    super(props);
  }

  public render() {
    return (
      <div className="display-data-prices-container">
        {this.props.items.map((itemLine, index) => (
          <DisplayItemListLine {...itemLine} />
        ))}
      </div>
    );
  }
}
