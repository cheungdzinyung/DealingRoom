import { applyMiddleware, createStore, Action, compose } from "redux";
import { IRootState, rootReducer } from "./components/reducers/index";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<IRootState, Action, {}, {}>(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));