import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

// Import UI elements
import { AppToaster } from "src/components/ui/mobile/toast";
import { Intent } from "@blueprintjs/core";

import {
    IOrderListStaff,
} from "../../../modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const UPDATE_STATUS_SERVED_SUCCESS = "UPDATE_STATUS_SERVED_SUCCESS";
export type UPDATE_STATUS_SERVED_SUCCESS = typeof UPDATE_STATUS_SERVED_SUCCESS;
export interface IUpdateOrderStatuServedSuccessAction extends Action {
    type: UPDATE_STATUS_SERVED_SUCCESS,
    result: any,
}

export const UPDATE_STATUS_SERVED_FAIL = "UPDATE_STATUS_SERVED_FAIL";
export type UPDATE_STATUS_SERVED_FAIL = typeof UPDATE_STATUS_SERVED_FAIL;
export interface IUpdateOrderStatusServedFailAction extends Action {
    type: UPDATE_STATUS_SERVED_FAIL,
    errMsg: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS";
export type GET_ALL_ORDERS_SUCCESS = typeof GET_ALL_ORDERS_SUCCESS;
export interface IGetAllOrdersSuccessAction extends Action {
    type: GET_ALL_ORDERS_SUCCESS,
    allOrders: any,
}

export const GET_ALL_ORDERS_FAIL = "GET_ALL_ORDERS_FAIL";
export type GET_ALL_ORDERS_FAIL = typeof GET_ALL_ORDERS_FAIL;
export interface IGetAllOrdersFailAction extends Action {
    type: GET_ALL_ORDERS_FAIL,
    errMsg: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SOCKET_CONNECT_SUCCESS = "SOCKET_CONNECT_SUCCESS";
export type SOCKET_CONNECT_SUCCESS = typeof SOCKET_CONNECT_SUCCESS;
export interface ISocketConnectSuccess extends Action {
    type: SOCKET_CONNECT_SUCCESS,
    socketID: any,
}

export const SOCKET_UPDATE_ORDER_LIST = "SOCKET_UPDATE_ORDER_LIST";
export type SOCKET_UPDATE_ORDER_LIST = typeof SOCKET_UPDATE_ORDER_LIST;
export interface ISocketUpdateOrderList extends Action {
    type: SOCKET_UPDATE_ORDER_LIST,
    allOrders: any,
}


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type WaiterActions =
    IGetAllOrdersSuccessAction |
    IGetAllOrdersFailAction |
    IUpdateOrderStatuServedSuccessAction |
    IUpdateOrderStatusServedFailAction |
    ISocketConnectSuccess |
    ISocketUpdateOrderList;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getAllOrdersSuccess(allOrders: IOrderListStaff): IGetAllOrdersSuccessAction {
    return {
        type: GET_ALL_ORDERS_SUCCESS,
        allOrders,
    }
}

export function getAllOrdersFail(errMsg: any): IGetAllOrdersFailAction {
    return {
        type: GET_ALL_ORDERS_FAIL,
        errMsg,
    }
}

export function getAllOrders() {
    return (dispatch: Dispatch<IGetAllOrdersSuccessAction | IGetAllOrdersFailAction>) => {
        // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
        const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
        axios.get(`${API_SERVER}/api/orders`, config)
            .then((res: any) => {
                if (res.status === 201) {
                    // alert(Object.keys(res.data));
                    dispatch(getAllOrdersSuccess(res.data));
                } else {
                    // alert("error, status code not match: " + res.status);
                    dispatch(getAllOrdersFail(res.status));
                    AppToaster.show({
                        message: "Error, try again\nstatu code does not match: " + res.status,
                        intent: Intent.WARNING,
                        icon: "cross",
                        timeout: 2000
                    });
                }
            })
            .catch((err: any) => {
                // alert(err);
                dispatch(getAllOrdersFail(err));
                AppToaster.show({
                    message: "Error, try again\n" + err,
                    intent: Intent.WARNING,
                    icon: "cross",
                    timeout: 2000
                });
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function updateOrderStatusServedSuccess(result: any): IUpdateOrderStatuServedSuccessAction {
    return {
        type: UPDATE_STATUS_SERVED_SUCCESS,
        result,
    }
}

export function updateOrderStatusServedFail(errMsg: any): IUpdateOrderStatusServedFailAction {
    return {
        type: UPDATE_STATUS_SERVED_FAIL,
        errMsg,
    }
}

export function updateOrderStatusServed(orderID: number) {
    return (dispatch: Dispatch<IUpdateOrderStatuServedSuccessAction | IUpdateOrderStatusServedFailAction>) => {
        const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
        axios.put(`${API_SERVER}/api/orders/${orderID}`, { status: "served" }, config)
            .then((res: any) => {
                if (res.status === 201) {
                    // res.data = [{"order_id": 6,"status": "made","isPaid": false}]
                    dispatch(updateOrderStatusServedSuccess(res.data[0]));
                    AppToaster.show({
                        message: "Tip well?",
                        intent: Intent.SUCCESS,
                        icon: "tick",
                        timeout: 2000
                    });
                } else {
                    // alert("error, status code not match: " + res.status);
                    dispatch(updateOrderStatusServedFail(res.data));
                    AppToaster.show({
                        message: "Error, try again",
                        intent: Intent.WARNING,
                        icon: "cross",
                        timeout: 2000
                    });
                }
            })
            .catch((err: any) => {
                // alert(err);
                dispatch(updateOrderStatusServedFail(err));
                AppToaster.show({
                    message: "Error, try again\n" + err,
                    intent: Intent.WARNING,
                    icon: "cross",
                    timeout: 2000
                });
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function socketConnect(socketID: any): ISocketConnectSuccess {
    return {
        type: SOCKET_CONNECT_SUCCESS,
        socketID,
    }
}

export function socketUpdateItemPrice(allOrders: IOrderListStaff): ISocketUpdateOrderList {
    return {
        type: SOCKET_UPDATE_ORDER_LIST,
        allOrders,
    }
}