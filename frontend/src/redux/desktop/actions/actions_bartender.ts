import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

import {
    IOrderListStaff,
} from "../../../modules";

// import { allOrders } from "../../../fakedata";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const UPDATE_STATUS_MADE_SUCCESS = "UPDATE_STATUS_MADE_SUCCESS";
export type UPDATE_STATUS_MADE_SUCCESS = typeof UPDATE_STATUS_MADE_SUCCESS;
export interface IUpdateOrderStatusMadeSuccessAction extends Action {
    type: UPDATE_STATUS_MADE_SUCCESS,
    result: any,
}

export const UPDATE_STATUS_MADE_FAIL = "UPDATE_STATUS_MADE_FAIL";
export type UPDATE_STATUS_MADE_FAIL = typeof UPDATE_STATUS_MADE_FAIL;
export interface IUpdateOrderStatusMadeFailAction extends Action {
    type: UPDATE_STATUS_MADE_FAIL,
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
export type BartenderActions =
    IGetAllOrdersSuccessAction |
    IGetAllOrdersFailAction |
    IUpdateOrderStatusMadeSuccessAction |
    IUpdateOrderStatusMadeFailAction |
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
                    alert("error, status code not match: " + res.status);
                    dispatch(getAllOrdersFail(res.status));
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getAllOrdersFail(err));
            });
    }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function updateOrderStatusMadeSuccess(result: any): IUpdateOrderStatusMadeSuccessAction {
    return {
        type: UPDATE_STATUS_MADE_SUCCESS,
        result,
    }
}

export function updateOrderStatusMadeFail(errMsg: any): IUpdateOrderStatusMadeFailAction {
    return {
        type: UPDATE_STATUS_MADE_FAIL,
        errMsg,
    }
}

export function updateOrderStatusMade(orderID: number) {
    return (dispatch: Dispatch<IUpdateOrderStatusMadeSuccessAction | IUpdateOrderStatusMadeFailAction>) => {
        const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
        axios.put(`${API_SERVER}/api/orders/${orderID}`, {status: "made"}, config)
            .then((res: any) => {
                if (res.status === 201) {
                    alert(res.data[0].status + " updated");
                    // res.data = [{"order_id": 6,"status": "made","isPaid": false}]
                    dispatch(updateOrderStatusMadeSuccess(res.data[0]));
                } else {
                    alert("error, status code not match: " + res.status);
                    dispatch(updateOrderStatusMadeFail(res.data));
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(updateOrderStatusMadeFail(err))
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