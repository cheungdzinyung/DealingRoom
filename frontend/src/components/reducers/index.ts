import { combineReducers } from 'redux';
import { ordersReducer, IOrdersState } from "./reducers_orders";

export interface IRootState {
    orders: IOrdersState,
}

export const rootReducer = combineReducers<IRootState>({
    orders: ordersReducer,
});