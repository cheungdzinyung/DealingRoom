// Importing modules from library
import * as React from "react";

// Importing temporary data
// import { singleCategoryMenuItems, displayMenuItemListTest } from "src/fakedata";

import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu } from "src/redux/display/actions/actions_display";

import { IMenuCategoryWithFlux } from "src/modules";

import { DisplayFlexItemLine } from "src/components/ui/display/displayfluxitemline";
import { DisplayMain } from "src/components/ui/display/displaymain";

interface IDisplayProps {
  singleCategory: IMenuCategoryWithFlux[];
  getEntireMenu: () => void;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    singleCategory: state.display.entireMenu
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    }
  };
};

export class PureDisplay extends React.Component<IDisplayProps, {}> {
  constructor(props: IDisplayProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getEntireMenu();
  }

  public render() {
    const data = [
      { time: "9", purchasePrice: 13 },
      { time: "10", purchasePrice: 26 },
      { time: "11", purchasePrice: 19 },
      { time: "12", purchasePrice: 28 },
      { time: "13", purchasePrice: 33 },
      { time: "14", purchasePrice: 29 },
      { time: "15", purchasePrice: 18 },
      { time: "16", purchasePrice: 36 }
    ];
    return (
      <div className="display-container">
        <div className="display-data-container">
          <DisplayMain singleCategory={this.props.singleCategory[0].categoryName} pirceChange={320} data={data} />
          <div className="display-data-sub-container">12</div>
          <div className="display-data-info-container">12</div>
          <div className="display-data-prices-container">
            {this.props.singleCategory[0].items.map((itemLine, index) => (
              <DisplayFlexItemLine {...itemLine} />
            ))}
          </div>
        </div>
        <div className="rss-feed">
          <span className="feed-text">
            This round of discount is brought to you by dealingroom!
          </span>
        </div>
      </div>
    );
  }
}

const Display = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureDisplay);

export default Display;
