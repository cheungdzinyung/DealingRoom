import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';

import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
