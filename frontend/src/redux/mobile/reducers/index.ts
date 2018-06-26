import { combineReducers } from 'redux';
import { ordersReducer, IOrdersState } from "./reducers_orders";
import { userReducer, IUserState } from "./reducers_user";
import { paymentReducer, IPaymentState } from "./reducers_payment";

export interface ICustomerState {
    orders: IOrdersState,
    user: IUserState,
    payment: IPaymentState,
}

export const customerReducer = combineReducers<ICustomerState>({
    orders: ordersReducer,
    user: userReducer,
    payment: paymentReducer,
});