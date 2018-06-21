import { applyMiddleware, createStore, Action, compose } from "redux";
import thunk from 'redux-thunk';


// combining reducers for mobile and 'desktop' version
import { combineReducers } from 'redux';
import { IRootState, rootReducer } from "./mobile/reducers/index";
import { IStaffState, staffReducer } from "./desktop/reducers/index";
export interface IAllState {
    customer: IRootState,
    staff: IStaffState,
}
export const allReducer = combineReducers<IAllState>({
    customer: rootReducer,
    staff: staffReducer,
});


// env
// export const API_SERVER = process.env.REACT_APP_API_SERVER;
export const API_SERVER = process.env.REACT_APP_API_DEV;


// socket.io
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


// create store
export const store = createStore<IAllState, Action, {}, {}>(allReducer, composeEnhancers(applyMiddleware(thunk, logger, socketIoMiddleware)));





// vvv not sure what this do
// store.subscribe(()=>{
//     alert(`new client state: ${Object.keys(store.getState())}`);
// });

//                               v prefix/action.type  v action.data
// vvv equivalent to socket.emit(prefix/type, data);
// store.dispatch({ type: 'server/hello', data: 'Hello!' });