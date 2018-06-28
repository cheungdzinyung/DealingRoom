// Importing modules from library
import * as React from "react";

import { IMenuCategoryWithFlux } from "src/modules";
import { DisplayFlexItemLine } from "src/components/ui/display/displayfluxitemline";

export class DisplayFluxContainer extends React.Component<
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
          <DisplayFlexItemLine {...itemLine} />
        ))}
      </div>
    );
  }
}
