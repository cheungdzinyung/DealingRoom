import { combineReducers } from 'redux';
import { ordersReducer, IOrdersState } from "./reducers_orders";
import { userReducer, IUserState } from "./reducers_user";

export interface ICustomerState {
    orders: IOrdersState,
    user: IUserState,
}

export const customerReducer = combineReducers<ICustomerState>({
    orders: ordersReducer,
    user: userReducer,
});