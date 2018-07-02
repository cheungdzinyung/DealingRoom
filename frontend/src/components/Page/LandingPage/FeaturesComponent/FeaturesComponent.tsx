import * as React from "react";
import "./style.css";
// import "simple-line-icons/css/simple-line-icons.css";
import demoScreen1 from "./demo-screen-1.jpg";

export const FeaturesComponent = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-heading text-center">
          <h2>Exciting, Unlimited Fun</h2>
          <p className="text-muted">
            Check out what you can do with our web-app!
          </p>
          <hr />
        </div>
        <div className="row">
          <div className="col-lg-4 my-auto">
            <div className="device-container">
              <div className="device-mockup iphone6_plus portrait white">
                <div className="device">
                  <div className="screen">
                    <img src={demoScreen1} className="img-fluid" alt="" />
                  </div>
                </div>
                <div className="button"/>
              </div>
            </div>
          </div>
          <div className="col-lg-8 my-auto">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-book-open text-primary" />
                    <h3>Browse Menu</h3>
                    <p className="text-muted">
                      Browse through the various categories to see the price and
                      information of the items. Performance trend graphs enable
                      you to see how each item has performed
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-bubble text-primary" />
                    <h3>Place Orders</h3>
                    <p className="text-muted">
                      Place order directly on the web-app! Never wait for
                      another server or bartender to take your order again.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-credit-card text-primary" />
                    <h3>Online Payment</h3>
                    <p className="text-muted">
                      Conveniently pay directly on the web-app. Never loose
                      another credit card at the bar again!
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-graph text-primary" />
                    <h3>Order Statistics</h3>
                    <p className="text-muted">
                      Check the various graphs and stats of your orders!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
