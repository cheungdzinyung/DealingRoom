// Importing modules from library
// import * as History from "history";
import * as React from "react";
import * as History from "history";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing static assets
import menu from "src/components/assets/images/introduction/menu.png";
import fullmenu from "src/components/assets/images/introduction/fullmenu.png";
import payment from "src/components/assets/images/introduction/payment.png";
import expandedItem from "src/components/assets/images/introduction/expandedItem.png";
import warning from "src/components/assets/images/introduction/warning.png";
import welcome from "src/components/assets/images/introduction/welcome.png";

interface IPureIntroductionProps {
  history: History.History;
}

interface IPureIntroductionState {
  activeSlide: number;
}

export default class PureIntroduction extends React.Component<
  IPureIntroductionProps,
  IPureIntroductionState
> {
  constructor(props: IPureIntroductionProps) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  public toMenu = () => {
    this.props.history.push("/customer/menu");
  };

  public render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true
    };
    return (
      <div className="intro-container">
        <Slider {...settings} className="slider-cont">
          <div className="intro-content">
            <img src={fullmenu} alt="" className="intro-content-image" />
            <h1 className="intro-header">Welcome</h1>
            <p className="intro-text">
              Embrace the idea of free market, instantly and seamlessly.
            </p>
          </div>
          <div className="intro-content">
            <img src={menu} alt="" className="intro-content-image" />
            <h1 className="intro-header">Menu</h1>
            <p className="intro-text">
              Order your favorite drinks and foods with an eye out for the best
              deal.
            </p>
          </div>
          <div className="intro-content">
            <img src={expandedItem} alt="" className="intro-content-image" />
            <h1 className="intro-header">Details</h1>
            <p className="intro-text">
              The devil lies in the details; good deal does not wait for anyone.
            </p>
          </div>
          <div className="intro-content">
            <img src={payment} alt="" className="intro-content-image" />
            <h1 className="intro-header">Payment</h1>
            <p className="intro-text">
              Pay your till anytime you want, no more long queues and flying
              receipes everywhere.
            </p>
          </div>
          <div className="intro-content">
            <img src={warning} alt="" className="intro-content-image" />
            <h1 className="intro-header">Drink with safe</h1>
            <p className="intro-text">
              Please be nice to you and everyone else, do not drink and drive.
            </p>
          </div>
          <div className="intro-content">
            <img src={welcome} alt="" className="intro-content-image" />
            <h1 className="intro-header">Enjoy!</h1>
            <button className="intro-skip" onClick={this.toMenu}>
              Start Ordering
            </button>
          </div>
        </Slider>
      </div>
    );
  }
}
