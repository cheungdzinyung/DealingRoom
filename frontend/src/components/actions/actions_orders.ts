import { Action, Dispatch } from "redux";
import axios from "axios";

interface IItem {
    thisItemID: string,
    uniqueID: string,
    name: string,
    ice: string,
    sweetness: string,
    garnish: string,
    purchasePrice: number,
}

interface IOrder {
    userID: string,
    table: string,
    status: string,
    item: IItem[],
}

export const ADD_ITEM = "ADD_ITEM";
export type ADD_ITEM = typeof ADD_ITEM;
export interface IAddItemAction extends Action {
    type: ADD_ITEM,
    uniqueID: string,
    name: string,
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export type REMOVE_ITEM = typeof REMOVE_ITEM;
export interface IRemoveItemAction extends Action {
    type: REMOVE_ITEM,
    thisItemID: string,
}

export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export type CONFIRM_ORDER_SUCCESS = typeof CONFIRM_ORDER_SUCCESS;
export interface IConfirmOrderSuccessAction extends Action {
    type: CONFIRM_ORDER_SUCCESS,
    result: any,
    orderToConfirm: IOrder,
}

export const CONFIRM_ORDER_FAIL = "CONFIRM_ORDER_FAIL";
export type CONFIRM_ORDER_FAIL = typeof CONFIRM_ORDER_FAIL;
export interface IConfirmOrderFailAction extends Action {
    type: CONFIRM_ORDER_FAIL,
    result: any,
}

export type OrdersActions =
    IAddItemAction |
    IRemoveItemAction |
    IConfirmOrderSuccessAction |
    IConfirmOrderFailAction;

export function addToCurrentOrder(uniqueID: string, name: string): IAddItemAction {
    return {
        type: ADD_ITEM,
        uniqueID,
        name,
    }
}

export function removeFromCurrentOrder(thisItemID: string): IRemoveItemAction {
    return {
        type: REMOVE_ITEM,
        thisItemID,
    }
}

export function confirmOrderSuccess(result: any, orderToConfirm: IOrder): IConfirmOrderSuccessAction {
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

export function confirmOrder(orderToConfirm: IOrder) {
    return (dispatch: Dispatch<IConfirmOrderSuccessAction | IConfirmOrderFailAction>) => {
        axios.post(`http://localhost:8080/api/orders/${orderToConfirm.userID}`, orderToConfirm)
            .then((res: any) => {
                if (res.body.status === 201) {
                    dispatch(confirmOrderSuccess(res.body, orderToConfirm))
                } else {
                    alert("ERR: " + res.body);
                    dispatch(confirmOrderFail(res.body))
                }
            })
            .catch((err: any) => {
                alert("ERR: " + err.body);
                dispatch(confirmOrderFail(err.body))
            });
    }
}