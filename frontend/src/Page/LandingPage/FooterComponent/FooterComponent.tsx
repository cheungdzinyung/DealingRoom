import * as React from "react";
import './style.css';

export const FooterComponent = ()=>{
  return <footer>
    <div className="container">
      <p>&copy; 2018 Dealing Room. All Rights Reserved.</p>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="#/">Privacy</a>
        </li>
        <li className="list-inline-item">
          <a href="#/">Terms</a>
        </li>
        <li className="list-inline-item">
          <a href="#/">FAQ</a>
        </li>
      </ul>
    </div>
  </footer>
};