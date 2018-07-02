import * as React from "react";
import "./style.css";
import QRCode from "./img/QRCode.png";

export const DiscoverComponent = () => {
  return (
    <section className="discover bg-primary text-center" id="discover">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="section-heading">
              Discover what all the buzz is about!
            </h2>
            <p>Scan the QR code below and test out our app!</p>
            <img src={QRCode} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
