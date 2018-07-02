import React from 'react';
import './style.css';

export const HowItWorksComponent = (props)=>{
  return <section className="cta" id="howitworks">
    <div className="cta-content">
      <div className="container">
        <h2>How it works</h2>
        <p>At Dealing Room, food and drink prices fluctuate according to their demands just like stock prices at a stock market. <br/><br/> Pay attention to the changing prices to capture the best value!</p>
        <a href="#features" className="btn btn-outline btn-xl js-scroll-trigger">Checkout our features!</a>
      </div>
    </div>
    <div className="overlay"></div>
  </section>
};