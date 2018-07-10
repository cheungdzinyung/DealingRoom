import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";
import { IMenuCategoryWithFlux, ISpecialEvent } from "src/modules";

// Import UI elements
import { AppToaster } from "src/Components/ToastAlert/toast";
import { Intent } from "@blueprintjs/core";

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

export const SOCKET_SP_EVENT_INFO = "SOCKET_SP_EVENT_INFO";
export type SOCKET_SP_EVENT_INFO = typeof SOCKET_SP_EVENT_INFO;
export interface ISocketSpEventInfo extends Action {
  type: SOCKET_SP_EVENT_INFO,
  eventInfo: ISpecialEvent,
}

export const TOGGLE_EVENT_BELL_RING = "TOGGLE_EVENT_BELL_RING";
export type TOGGLE_EVENT_BELL_RING = typeof TOGGLE_EVENT_BELL_RING;
export interface IToggleEventBellRing extends Action {
  type: TOGGLE_EVENT_BELL_RING,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type DisplayActions =
  IGetEntireMenuSuccessAction |
  IGetEntireMenuFailAction |
  ISocketConnectSuccess |
  ISocketUpdateItemPrice |
  ISocketSpEventInfo |
  IToggleEventBellRing;

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
  return (dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>) => {
    const year = (new Date(Date.now())).getFullYear();
    const month = (new Date(Date.now())).getMonth() + 1;
    const date = (new Date(Date.now())).getDate();
    axios.get(`${API_SERVER}/api/items/?isActive=true&fluctuatingPrices=${year}-${month}-${date}`)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getEntireMenuSuccess(res.data));
        } else {
          dispatch(getEntireMenuFail());
          AppToaster.show({
            message: "Error, try again\nstatus: " + res.status,
            intent: Intent.WARNING,
            icon: "cross",
            timeout: 2000
          });
        }
      })
      .catch((err: any) => {
        dispatch(getEntireMenuFail());
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

export function socketUpdateItemPrice(entireMenu: IMenuCategoryWithFlux[]): ISocketUpdateItemPrice {
  return {
    type: SOCKET_UPDATE_ITEM_PRICE,
    entireMenu,
  }
}

export function socketSpEventInfo(eventInfo: ISpecialEvent): ISocketSpEventInfo {
  return {
    type: SOCKET_SP_EVENT_INFO,
    eventInfo,
  }
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function toggleEventBellRing(): IToggleEventBellRing {
  return {
    type: TOGGLE_EVENT_BELL_RING,
  }
}