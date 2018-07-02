// Importing modules from library
import * as React from "react";

// Redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu } from "src/redux/display/actions/actions_display";

// Importing interfaces
import { IMenuCategoryWithFlux, ISpecialEvent } from "src/modules";

// Importing UI components
import { DisplayMain } from "src/components/ui/display/displaymain";
import { DisplayInfo } from "src/components/ui/display/displayinfo";
import { DisplayFluxContainer } from "src/components/ui/display/displayflux";
import { DisplayDataSub } from "src/components/ui/display/displaydatasub";

// import Sound from "react-sound";

interface IDisplayState {
  categoryIndexCount: number
}

interface IDisplayProps {
  entireMenu: IMenuCategoryWithFlux[];
  eventInfo: ISpecialEvent;
  getEntireMenu: () => void;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.display.entireMenu,
    eventInfo: state.display.eventInfo,
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
  IDisplayState
  > {
  constructor(props: IDisplayProps) {
    super(props);
    this.props.getEntireMenu();

    this.state = {
      categoryIndexCount: 0
    };
  }

  public loopingArrayCount = () => {
    if (this.state.categoryIndexCount === this.props.entireMenu.length - 1) {
      this.setState({
        categoryIndexCount: 0
      })
    }
    else {
      this.setState({
        categoryIndexCount: this.state.categoryIndexCount + 1
      })
    }
  }

  public componentDidMount() {
    setInterval(this.loopingArrayCount, 5000);
  }

  public render() {
    // const avgP =
    //   this.props.entireMenu[this.state.categoryIndexCount].items.reduce((accum, currentValue) => {
    //     return accum + currentValue.currentPrice;
    //   }, 0);

    // / this.props.entireMenu[this.state.categoryIndexCount].items.length

    return (
      <div className="display-container">
        <div className="display-data-container">
          <DisplayMain
            singleCategory={this.props.entireMenu[this.state.categoryIndexCount].categoryName}
            averagePrice={this.props.entireMenu[this.state.categoryIndexCount].items[0].currentPrice}
            data={this.props.entireMenu[this.state.categoryIndexCount].items[0].chartData}
          />
          <DisplayDataSub />
          <DisplayInfo />
          <DisplayFluxContainer {...this.props.entireMenu[this.state.categoryIndexCount]} />
        </div>
        <div className="rss-feed">
          <span className="feed-text">
            This round of discount is brought to you by {(this.props.eventInfo.sponsor !== "") ? this.props.eventInfo.sponsor : "dealingroom.live"}!
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
