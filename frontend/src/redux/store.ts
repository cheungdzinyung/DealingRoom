import { applyMiddleware, createStore, Action, compose } from "redux";
import thunk from 'redux-thunk';

// combining reducers for mobile and 'desktop' version
import { combineReducers } from 'redux';
import { ICustomerState, customerReducer } from "./mobile/reducers/index";
import { IStaffState, staffReducer } from "./desktop/reducers/index";
import { IDisplayState, displayReducer } from "src/redux/display/reducers/reducers_display";

export interface IRootState {
    customer: ICustomerState,
    staff: IStaffState,
    display: IDisplayState
}
export const rootReducer = combineReducers<IRootState>({
    customer: customerReducer,
    staff: staffReducer,
    display: displayReducer
});

// env
export const API_SERVER = process.env.REACT_APP_API_SERVER;
// export const API_SERVER = process.env.REACT_APP_API_DEV;

// export const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE_REAL;
export const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE_DEV;

// middleware
// socket.io
import createSocketIoMiddleware from 'redux-socket.io';
import * as io from 'socket.io-client';
const socket = io(`${API_SERVER}`);
const socketIoMiddleware = createSocketIoMiddleware(socket, ["GET", "POST", "PUT"]);

// redux-logger
import logger from 'redux-logger';

// redux-dev-tools
declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = createStore<IRootState, Action, {}, {}>(rootReducer, composeEnhancers(applyMiddleware(thunk, logger, socketIoMiddleware)));

// vvv not sure what this do
// store.subscribe(()=>{
//     alert(`new client state: ${Object.keys(store.getState())}`);
// });

//                               v prefix/action.type  v action.data
// vvv equivalent to socket.emit(prefix/type, data);
// store.dispatch({ type: 'server/hello', data: 'Hello!' });