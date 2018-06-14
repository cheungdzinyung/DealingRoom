import { combineReducers } from 'redux';
import { ordersReducer, IOrdersState } from "./reducers_orders";
import { userReducer, IUserState } from "./reducers_user";

export interface IRootState {
    orders: IOrdersState,
    user: IUserState,
}

export const rootReducer = combineReducers<IRootState>({
    orders: ordersReducer,
    user: userReducer,
});