import { combineReducers } from 'redux';
import { initializeReducer, IInitializeState } from "./reducers_initialize";
import { ordersReducer, IOrdersState } from "./reducers_orders";
import { userReducer, IUserState } from "./reducers_user";

export interface IRootState {
    initialize: IInitializeState,
    orders: IOrdersState,
    user: IUserState,
}

export const rootReducer = combineReducers<IRootState>({
    initialize: initializeReducer,
    orders: ordersReducer,
    user: userReducer,
});