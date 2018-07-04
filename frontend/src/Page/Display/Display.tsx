// Importing modules from library
import * as React from "react";
import ReactPlayer from "react-player";

// Importing styling and static assets
import "./Display.scss";

// Redux
import { connect } from "react-redux";
import { IRootState } from "src/redux/store";
import {
  getEntireMenu,
  toggleEventBellRing
} from "src/redux/display/actions/actions_display";

// Importing interfaces
import { IMenuCategoryWithFluxWithMaxMin, ISpecialEvent } from "src/modules";

// Importing UI components
import { DisplayMain } from "./DisplayMainComponent/DisplayMain";
import { DisplayVideo } from "./DisplayVideoComponent/DisplayVideo";
import { DisplayItemList } from "./DisplayItemListComponent/DisplayItemList";
import { DisplayCategoryList } from "./DisplayCategoryListComponent/DisplayCategoryList";


interface IDisplayState {
  categoryIndexCount: number;
  colorChange: boolean;
}

interface IDisplayProps {
  entireMenu: IMenuCategoryWithFluxWithMaxMin[];
  getEntireMenu: () => void;
  eventInfo: ISpecialEvent;
  bellRinging: boolean;
  toggleEventBellRing: () => void;
}

// Redux
const mapStateToProps = (state: IRootState) => {
  return {
    entireMenu: state.display.entireMenu,
    eventInfo: state.display.eventInfo,
    bellRinging: state.display.bellRinging
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

export class PureDisplay extends React.Component<IDisplayProps, IDisplayState> {
  private toggleColor: any;
  // private audioElement: any;
  constructor(props: IDisplayProps) {
    super(props);
    this.props.getEntireMenu();

    this.state = {
      categoryIndexCount: 0,
      colorChange: false,
    };
  }

  public loopingArrayCount = () => {
    if (this.state.categoryIndexCount === this.props.entireMenu.length - 1) {
      this.setState({
        categoryIndexCount: 0
      });
    } else {
      this.setState({
        categoryIndexCount: this.state.categoryIndexCount + 1
      });
    }
  };

  public componentDidMount() {
    setInterval(this.loopingArrayCount, 5000);
  }

  public componentDidUpdate() {
    if (this.props.bellRinging) {
      if (typeof (this.toggleColor) === "undefined") {
        this.toggleColor = setInterval(() => {
          this.setState({
            colorChange: !this.state.colorChange
          });
        }, 1000)
      }
      setTimeout(() => {
        this.props.toggleEventBellRing();
        clearInterval(this.toggleColor);
      }, 12000);
    }
  }

  public rssFeed = () => {
    if (this.props.eventInfo.discount === 0) {
      return (
        <div className="rss-feed" />
      )
    } else {
      if (this.state.colorChange) {
        return (
          <div className="rss-feed-flick">
            <span className="feed-text">
              This round of {this.props.eventInfo.discount}% discount is brought to you by
              {this.props.eventInfo.sponsor !== ""
                ? this.props.eventInfo.sponsor
                : "dealingroom.live"}!
            </span>
          </div>
        )
      } else {
        return (
          <div className="rss-feed">
            <span className="feed-text">
              This round of {this.props.eventInfo.discount}% discount is brought to you by
              {this.props.eventInfo.sponsor !== ""
                ? this.props.eventInfo.sponsor
                : "dealingroom.live"}!
            </span>
          </div >
        )
      }
    }
  }

  public render() {
    return (
      <div className="display-container">
        <div className="display-data-container">
          <DisplayMain
            singleCategory={
              this.props.entireMenu[this.state.categoryIndexCount].categoryName
            }
            averagePrice={
              this.props.entireMenu[this.state.categoryIndexCount].items[0]
                .currentPrice
            }
            data={
              this.props.entireMenu[this.state.categoryIndexCount].items[0]
                .chartData
            }
          />
          <DisplayCategoryList
            category={this.props.entireMenu[this.state.categoryIndexCount].categoryName}
            max={this.props.entireMenu[this.state.categoryIndexCount].todayMax}
            min={this.props.entireMenu[this.state.categoryIndexCount].todayMin}
          />
          <DisplayVideo />
          <DisplayItemList
            {...this.props.entireMenu[this.state.categoryIndexCount]}
          />
        </div>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=wK9Wvxi1cE8"
          // url="https://drive.google.com/file/d/0B7J1yeBD6ckEYUFTbkVaNGpvZkU/view"
          playing={this.props.bellRinging}
          loop={this.props.bellRinging}
          controls={false}
          width="0"
          height="0"
        />
        {this.rssFeed()}
      </div>
    )
  }
}

const Display = connect(
  mapStateToProps,
  mapDispatchToProps
)(PureDisplay);

export default Display;
