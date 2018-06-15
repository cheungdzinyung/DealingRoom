import { Action, Dispatch } from "redux";
import axios from "axios";

import {
    ICurrentOrder,
} from "../../modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const ADD_ITEM = "ADD_ITEM";
export type ADD_ITEM = typeof ADD_ITEM;
export interface IAddItemAction extends Action {
    type: ADD_ITEM,
    itemid: string,
    itemName: string,
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export type REMOVE_ITEM = typeof REMOVE_ITEM;
export interface IRemoveItemAction extends Action {
    type: REMOVE_ITEM,
    thisItemID: string,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export type CONFIRM_ORDER_SUCCESS = typeof CONFIRM_ORDER_SUCCESS;
export interface IConfirmOrderSuccessAction extends Action {
    type: CONFIRM_ORDER_SUCCESS,
    result: any,
    orderToConfirm: ICurrentOrder,
}

export const CONFIRM_ORDER_FAIL = "CONFIRM_ORDER_FAIL";
export type CONFIRM_ORDER_FAIL = typeof CONFIRM_ORDER_FAIL;
export interface IConfirmOrderFailAction extends Action {
    type: CONFIRM_ORDER_FAIL,
    result: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ORDERS_BY_USERID_SUCCESS = "GET_ORDERS_BY_USERID_SUCCESS";
export type GET_ORDERS_BY_USERID_SUCCESS = typeof GET_ORDERS_BY_USERID_SUCCESS;
export interface IGetOrdersByUseridSuccessAction extends Action {
    type: GET_ORDERS_BY_USERID_SUCCESS,
    allOrdersByOneUser: any,
}

export const GET_ORDERS_BY_USERID_FAIL = "GET_ORDERS_BY_USERID_FAIL";
export type GET_ORDERS_BY_USERID_FAIL = typeof GET_ORDERS_BY_USERID_FAIL;
export interface IGetOrdersByUseridFailAction extends Action {
    type: GET_ORDERS_BY_USERID_FAIL,
    // result: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */

export type OrdersActions =
    IAddItemAction |
    IRemoveItemAction |
    IConfirmOrderSuccessAction |
    IConfirmOrderFailAction |
    IGetOrdersByUseridSuccessAction |
    IGetOrdersByUseridFailAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function addToCurrentOrder(itemid: string, itemName: string): IAddItemAction {
    return {
        type: ADD_ITEM,
        itemid,
        itemName,
    }
}

export function removeFromCurrentOrder(thisItemID: string): IRemoveItemAction {
    return {
        type: REMOVE_ITEM,
        thisItemID,
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function confirmOrderSuccess(result: any, orderToConfirm: ICurrentOrder): IConfirmOrderSuccessAction {
    return {
        type: CONFIRM_ORDER_SUCCESS,
        result,
        orderToConfirm,
    }
}

export function confirmOrderFail(result: any): IConfirmOrderFailAction {
    return {
        type: CONFIRM_ORDER_FAIL,
        result,
    }
}

export function confirmOrder(orderToConfirm: ICurrentOrder) {
    return (dispatch: Dispatch<IConfirmOrderSuccessAction | IConfirmOrderFailAction>) => {
        axios.post(`http://localhost:8080/api/orders/${orderToConfirm.users_id}`, orderToConfirm)
            .then((res: any) => {
                if (res.status === 201) {
                    alert(res.data[0].status);
                    dispatch(confirmOrderSuccess(res.body, orderToConfirm));
                } else {
                    alert("error, try again");
                    dispatch(confirmOrderFail(res.body));
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(confirmOrderFail(err))
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getOrdersByUseridSuccess(allOrdersByOneUser: any): IGetOrdersByUseridSuccessAction {
    return {
        type: GET_ORDERS_BY_USERID_SUCCESS,
        allOrdersByOneUser,
    }
}

export function getOrdersByUseridFail(): IGetOrdersByUseridFailAction {
    return {
        type: GET_ORDERS_BY_USERID_FAIL,
    }
}

export function getOrdersByUserid(userID: number) {
    return (dispatch: Dispatch<IGetOrdersByUseridSuccessAction | IGetOrdersByUseridFailAction>) => {
        axios.get(`http://localhost:8080/api/orders/user/${userID}`)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getOrdersByUseridSuccess(res.data[0]));
                    // auto redir to order list page
                    // dispatch(changePage(OrderList));
                } else {
                    alert("status: " + res.status);
                    dispatch(getOrdersByUseridFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getOrdersByUseridFail())
            });
    }
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */