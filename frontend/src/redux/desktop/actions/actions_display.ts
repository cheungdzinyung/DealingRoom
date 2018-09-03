import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

import {
    IMenuCategoryWithFlux,
} from "src/modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
    type: GET_ENTIRE_MENU_SUCCESS,
    entireMenu: IMenuCategoryWithFlux[],
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
    type: GET_ENTIRE_MENU_FAIL,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SOCKET_CONNECT_SUCCESS = "SOCKET_CONNECT_SUCCESS";
export type SOCKET_CONNECT_SUCCESS = typeof SOCKET_CONNECT_SUCCESS;
export interface ISocketConnectSuccess extends Action {
    type: SOCKET_CONNECT_SUCCESS,
    socketID: any,
}

export const SOCKET_UPDATE_ITEM_PRICE = "SOCKET_UPDATE_ITEM_PRICE";
export type SOCKET_UPDATE_ITEM_PRICE = typeof SOCKET_UPDATE_ITEM_PRICE;
export interface ISocketUpdateItemPrice extends Action {
    type: SOCKET_UPDATE_ITEM_PRICE,
    entireMenu: any,
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type DisplayActions =
    IGetEntireMenuSuccessAction |
    IGetEntireMenuFailAction |
    ISocketConnectSuccess |
    ISocketUpdateItemPrice;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(entireMenu: IMenuCategoryWithFlux[]): IGetEntireMenuSuccessAction {
    return {
        type: GET_ENTIRE_MENU_SUCCESS,
        entireMenu,
    }
}

export function getEntireMenuFail(): IGetEntireMenuFailAction {
    return {
        type: GET_ENTIRE_MENU_FAIL,
    }
}

export function getEntireMenu() {
    return (dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>) => {
        const year = (new Date(Date.now())).getFullYear();
        const month = (new Date(Date.now())).getMonth() + 1;
        const date = (new Date(Date.now())).getDate();
        axios.get(`${API_SERVER}/api/items/?fluctuatingPrices=${year}-${month}-${date}`)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getEntireMenuSuccess(res.data));
                } else {
                    alert("error, status code not match: " + res.status);
                    dispatch(getEntireMenuFail());
                }
            })
            .catch((err: any) => {
                alert(err);
                dispatch(getEntireMenuFail());
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

export function socketUpdateItemPrice(entireMenu: IMenuCategoryWithFlux[]): ISocketUpdateItemPrice {
    return {
        type: SOCKET_UPDATE_ITEM_PRICE,
        entireMenu,
    }
}