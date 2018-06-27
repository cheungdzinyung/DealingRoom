// Importing modules from library
import * as React from "react";

// Importing temporary data
import { singleCategoryMenuItems } from "src/fakedata";

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

export class PureDisplay extends React.Component<
  IDisplayProps,
  { singleTestCat: IMenuCategoryWithFlux }
  > {
  constructor(props: IDisplayProps) {
    super(props);
    this.props.getEntireMenu();

    this.state = {
      singleTestCat: singleCategoryMenuItems
    };
  }

  //   public componentDidMount() {
  //     this.props.getEntireMenu();
  //   }

  public render() {
    return (
      <div className="display-container">
        <div className="display-data-container">
          {/* FIXME: Forced the first array of the category into the chart data */}
          <DisplayMain
            singleCategory={this.state.singleTestCat.categoryName}
            pirceChange={420.69}
            data={this.state.singleTestCat.items[0].chartData}
          />
          <div className="display-data-sub-container">12</div>
          <div className="display-data-info-container">
            <div className="youtube-container">
              <iframe src="https://www.youtube.com/embed/i0p1bmr0EmE"  className="video"  frameBorder={0}/>
            </div>
          </div>
          <div className="display-data-prices-container">
            {this.state.singleTestCat.items.map((itemLine, index) => (
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
