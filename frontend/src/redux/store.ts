import { applyMiddleware, createStore, Action, compose } from "redux";
import { IRootState, rootReducer } from "./reducers/index";
import thunk from 'redux-thunk';

// export const API_SERVER = process.env.REACT_APP_API_SERVER;
export const API_SERVER = process.env.REACT_APP_API_DEV;

import createSocketIoMiddleware from 'redux-socket.io';
import * as io from 'socket.io-client';

const socket = io(`${API_SERVER}`);
const socketIoMiddleware = createSocketIoMiddleware(socket, ["GET", "POST", "PUT"]);

import logger from 'redux-logger';
declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore<IRootState, Action, {}, {}>(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));
export const store = createStore<IRootState, Action, {}, {}>(rootReducer, composeEnhancers(applyMiddleware(thunk, logger, socketIoMiddleware)));

// vvv not sure what this do
// store.subscribe(()=>{
//     alert(`new client state: ${Object.keys(store.getState())}`);
// });

//                               v prefix/action.type  v action.data
// vvv equivalent to socket.emit(prefix/type, data);
// store.dispatch({ type: 'server/hello', data: 'Hello!' });