import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

import { ICurrentOrder, IMenuCategoryWithFlux } from "src/modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
  type: GET_ENTIRE_MENU_SUCCESS;
  entireMenu: IMenuCategoryWithFlux[];
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
  type: GET_ENTIRE_MENU_FAIL;
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const ADD_ITEM = "ADD_ITEM";
export type ADD_ITEM = typeof ADD_ITEM;
export interface IAddItemAction extends Action {
  type: ADD_ITEM;
  item_id: number;
  itemName: string;
  currentPrice: number;
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export type REMOVE_ITEM = typeof REMOVE_ITEM;
export interface IRemoveItemAction extends Action {
  type: REMOVE_ITEM;
  thisItemID: number;
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export type CONFIRM_ORDER_SUCCESS = typeof CONFIRM_ORDER_SUCCESS;
export interface IConfirmOrderSuccessAction extends Action {
  type: CONFIRM_ORDER_SUCCESS;
  result: any;
  orderToConfirm: ICurrentOrder;
}

export const CONFIRM_ORDER_FAIL = "CONFIRM_ORDER_FAIL";
export type CONFIRM_ORDER_FAIL = typeof CONFIRM_ORDER_FAIL;
export interface IConfirmOrderFailAction extends Action {
  type: CONFIRM_ORDER_FAIL;
  result: any;
}

export const RESET_CONFIRM_ORDER_STATUS = "RESET_CONFIRM_ORDER_STATUS";
export type RESET_CONFIRM_ORDER_STATUS = typeof RESET_CONFIRM_ORDER_STATUS;
export interface IResetConfirmOrderStatusAction extends Action {
  type: RESET_CONFIRM_ORDER_STATUS;
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ORDERS_BY_USER_TOKEN_SUCCESS = "GET_ORDERS_BY_USER_TOKEN_SUCCESS";
export type GET_ORDERS_BY_USER_TOKEN_SUCCESS = typeof GET_ORDERS_BY_USER_TOKEN_SUCCESS;
export interface IGetOrdersByUserTokenSuccessAction extends Action {
  type: GET_ORDERS_BY_USER_TOKEN_SUCCESS;
  allOrdersByOneUser: any;
}

export const GET_ORDERS_BY_USER_TOKEN_FAIL = "GET_ORDERS_BY_USER_TOKEN_FAIL";
export type GET_ORDERS_BY_USER_TOKEN_FAIL = typeof GET_ORDERS_BY_USER_TOKEN_FAIL;
export interface IGetOrdersByUserTokenFailAction extends Action {
  type: GET_ORDERS_BY_USER_TOKEN_FAIL;
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const SOCKET_CONNECT_SUCCESS = "SOCKET_CONNECT_SUCCESS";
export type SOCKET_CONNECT_SUCCESS = typeof SOCKET_CONNECT_SUCCESS;
export interface ISocketConnectSuccess extends Action {
  type: SOCKET_CONNECT_SUCCESS;
  socketID: any;
}

export const SOCKET_UPDATE_ITEM_PRICE = "SOCKET_UPDATE_ITEM_PRICE";
export type SOCKET_UPDATE_ITEM_PRICE = typeof SOCKET_UPDATE_ITEM_PRICE;
export interface ISocketUpdateItemPrice extends Action {
  type: SOCKET_UPDATE_ITEM_PRICE;
  entireMenu: IMenuCategoryWithFlux[];
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type OrdersActions =
  | IGetEntireMenuSuccessAction
  | IGetEntireMenuFailAction
  | IAddItemAction
  | IRemoveItemAction
  | IConfirmOrderSuccessAction
  | IConfirmOrderFailAction
  | IResetConfirmOrderStatusAction
  | IGetOrdersByUserTokenSuccessAction
  | IGetOrdersByUserTokenFailAction
  | ISocketConnectSuccess
  | ISocketUpdateItemPrice;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(
  entireMenu: IMenuCategoryWithFlux[]
): IGetEntireMenuSuccessAction {
  return {
    type: GET_ENTIRE_MENU_SUCCESS,
    entireMenu
  };
}

export function getEntireMenuFail(): IGetEntireMenuFailAction {
  return {
    type: GET_ENTIRE_MENU_FAIL
  };
}

export function getEntireMenu() {
  return (
    dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>
  ) => {
    // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
    const year = new Date(Date.now()).getFullYear();
    const month = new Date(Date.now()).getMonth() + 1;
    const date = new Date(Date.now()).getDate();
    axios
      .get(
        `https://api.dealingroom.live/api/items/?isActive=true&fluctuatingPrices=${year}-${month}-${date}`
      )
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
  };
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function addToCurrentOrder(
  itemId: number,
  itemName: string,
  currentPrice: number
): IAddItemAction {
  return {
    type: ADD_ITEM,
    item_id: itemId,
    itemName,
    currentPrice
  };
}

export function removeFromCurrentOrder(thisItemID: number): IRemoveItemAction {
  return {
    type: REMOVE_ITEM,
    thisItemID
  };
}
/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function confirmOrderSuccess(
  result: any,
  orderToConfirm: ICurrentOrder
): IConfirmOrderSuccessAction {
  return {
    type: CONFIRM_ORDER_SUCCESS,
    result,
    orderToConfirm
  };
}

export function confirmOrderFail(result: any): IConfirmOrderFailAction {
  return {
    type: CONFIRM_ORDER_FAIL,
    result
  };
}

export function confirmOrder(orderToConfirm: ICurrentOrder) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("dealingRoomToken")
    }
  };
  return (
    dispatch: Dispatch<IConfirmOrderSuccessAction | IConfirmOrderFailAction>
  ) => {
    axios
      .post(`${API_SERVER}/api/orders/`, orderToConfirm, config)
      .then((res: any) => {
        if (res.status === 201) {
          dispatch(confirmOrderSuccess(res.data[0], orderToConfirm));
        } else {
          alert("error, status code not match: " + res.status);
          dispatch(confirmOrderFail(res.data));
        }
      })
      .catch((err: any) => {
        alert(err);
        dispatch(confirmOrderFail(err));
      });
  };
}

export function resetConfirmOrderStatus(): IResetConfirmOrderStatusAction {
  return {
    type: RESET_CONFIRM_ORDER_STATUS
  };
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getOrdersByUserTokenSuccess(
  allOrdersByOneUser: any
): IGetOrdersByUserTokenSuccessAction {
  return {
    type: GET_ORDERS_BY_USER_TOKEN_SUCCESS,
    allOrdersByOneUser
  };
}

export function getOrdersByUserTokenFail(): IGetOrdersByUserTokenFailAction {
  return {
    type: GET_ORDERS_BY_USER_TOKEN_FAIL
  };
}

export function getOrdersByUserToken() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("dealingRoomToken")
    }
  };
  return (
    dispatch: Dispatch<
      IGetOrdersByUserTokenSuccessAction | IGetOrdersByUserTokenFailAction
    >
  ) => {
    axios
      .get(`${API_SERVER}/api/orders/user/`, config)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getOrdersByUserTokenSuccess(res.data[0]));
        } else {
          alert("error, status code not match: " + res.status);
          dispatch(getOrdersByUserTokenFail());
        }
      })
      .catch((err: any) => {
        alert(err);
        dispatch(getOrdersByUserTokenFail());
      });
  };
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function socketConnect(socketID: any): ISocketConnectSuccess {
  return {
    type: SOCKET_CONNECT_SUCCESS,
    socketID
  };
}

export function socketUpdateItemPrice(
  entireMenu: IMenuCategoryWithFlux[]
): ISocketUpdateItemPrice {
  return {
    type: SOCKET_UPDATE_ITEM_PRICE,
    entireMenu
  };
}
