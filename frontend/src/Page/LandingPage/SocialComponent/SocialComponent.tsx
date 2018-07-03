import * as React from "react";
import "./style.css";

export const SocialComponent = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2>
          We &nbsp;
          <i className="fa fa-heart" />
          &nbsp; new friends!
        </h2>
        <ul className="list-inline list-social">
          <li className="list-inline-item social-twitter">
            <a href="#/">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li className="list-inline-item social-facebook">
            <a href="#/">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li className="list-inline-item social-google-plus">
            <a href="#/">
              <i className="fa fa-google-plus" />
            </a>
          </li>
        </ul>
        <br />
        <br />
        <h2> Contact Us </h2>
        <h3>Email: info@dealingroom.live</h3>
        <h3>Tel: +852 6883 8583</h3>
      </div>
    </section>
  );
};
