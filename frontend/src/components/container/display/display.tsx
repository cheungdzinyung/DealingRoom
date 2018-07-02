// Importing modules from library
import * as React from "react";
import ReactPlayer from 'react-player'

// Redux
import { connect } from "react-redux";
import { IRootState } from "../../../redux/store";
import { getEntireMenu, toggleEventBellRing } from "src/redux/display/actions/actions_display";

// Importing interfaces
import { IMenuCategoryWithFlux, ISpecialEvent } from "src/modules";

// Importing UI components
import { DisplayMain } from "src/components/ui/display/displaymain";
import { DisplayInfo } from "src/components/ui/display/displayinfo";
import { DisplayFluxContainer } from "src/components/ui/display/displayflux";
import { DisplayDataSub } from "src/components/ui/display/displaydatasub";


interface IDisplayState {
  categoryIndexCount: number,
}

interface IDisplayProps {
  entireMenu: IMenuCategoryWithFlux[];
  getEntireMenu: () => void;
  eventInfo: ISpecialEvent;
  bellRinging: boolean,
  toggleEventBellRing: () => void;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.display.entireMenu,
    eventInfo: state.display.eventInfo,
    bellRinging: state.display.bellRinging,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEntireMenu: () => {
      dispatch(getEntireMenu());
    },
    toggleEventBellRing: () => {
      dispatch(toggleEventBellRing());
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
      categoryIndexCount: 0,
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

  public componentDidUpdate(){
    if (this.props.bellRinging) {
      setTimeout(()=>{this.props.toggleEventBellRing()}, 12000)
    }
  }

  public soundPlayer = () => {
    return (
      <ReactPlayer
        url='https://www.youtube.com/watch?v=wK9Wvxi1cE8'
        playing={this.props.bellRinging}
        loop={this.props.bellRinging}
        width="0"
        height="0"
      />
    )
  }

  public render() {
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
        {
          this.soundPlayer()
        }
      </div>
    );
  }
}

const Display = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureDisplay);

export default Display;
