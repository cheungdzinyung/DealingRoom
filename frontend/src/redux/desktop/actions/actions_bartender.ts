// import { Action, Dispatch } from "redux";
// import axios from "axios";

// import { API_SERVER } from "../../store";

// import {
//     ICurrentOrder,
//     IMenuCategoryWithFlux,
// } from "../../../modules";
// import { allOrders } from "../../../fakedata";

// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
// export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
// export interface IGetEntireMenuSuccessAction extends Action {
//     type: GET_ENTIRE_MENU_SUCCESS,
//     entireMenu: IMenuCategoryWithFlux[],
// }

// export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
// export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
// export interface IGetEntireMenuFailAction extends Action {
//     type: GET_ENTIRE_MENU_FAIL,
// }

// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export const UPDATE_STATUS_MADE_SUCCESS = "UPDATE_STATUS_MADE_SUCCESS";
// export type UPDATE_STATUS_MADE_SUCCESS = typeof UPDATE_STATUS_MADE_SUCCESS;
// export interface IConfirmOrderSuccessAction extends Action {
//     type: UPDATE_STATUS_MADE_SUCCESS,
// }

// export const UPDATE_STATUS_MADE_FAIL = "UPDATE_STATUS_MADE_FAIL";
// export type UPDATE_STATUS_MADE_FAIL = typeof UPDATE_STATUS_MADE_FAIL;
// export interface IConfirmOrderFailAction extends Action {
//     type: UPDATE_STATUS_MADE_FAIL,
//     errMsg: any,
// }
// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export const GET_ALL_ORDERS_WITH_TOKEN_SUCCESS = "GET_ALL_ORDERS_WITH_TOKEN_SUCCESS";
// export type GET_ALL_ORDERS_WITH_TOKEN_SUCCESS = typeof GET_ALL_ORDERS_WITH_TOKEN_SUCCESS;
// export interface IGetOrdersByUserTokenSuccessAction extends Action {
//     type: GET_ALL_ORDERS_WITH_TOKEN_SUCCESS,
//     allOrders: any,
// }

// export const GET_ALL_ORDERS_WITH_TOKEN_FAIL = "GET_ALL_ORDERS_WITH_TOKEN_FAIL";
// export type GET_ALL_ORDERS_WITH_TOKEN_FAIL = typeof GET_ALL_ORDERS_WITH_TOKEN_FAIL;
// export interface IGetOrdersByUserTokenFailAction extends Action {
//     type: GET_ALL_ORDERS_WITH_TOKEN_FAIL,
//     errMsg: any,
// }
// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export const SOCKET_CONNECT_SUCCESS = "SOCKET_CONNECT_SUCCESS";
// export type SOCKET_CONNECT_SUCCESS = typeof SOCKET_CONNECT_SUCCESS;
// export interface ISocketConnectSuccess extends Action {
//     type: SOCKET_CONNECT_SUCCESS,
//     socketID: any,
// }

// export const SOCKET_UPDATE_ITEM_PRICE = "SOCKET_UPDATE_ITEM_PRICE";
// export type SOCKET_UPDATE_ITEM_PRICE = typeof SOCKET_UPDATE_ITEM_PRICE;
// export interface ISocketUpdateItemPrice extends Action {
//     type: SOCKET_UPDATE_ITEM_PRICE,
//     allOrders: any,
// }


// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export type OrdersActions =
//     IGetEntireMenuSuccessAction |
//     IGetEntireMenuFailAction |
//     IAddItemAction |
//     IRemoveItemAction |
//     IConfirmOrderSuccessAction |
//     IConfirmOrderFailAction |
//     IGetOrdersByUserTokenSuccessAction |
//     IGetOrdersByUserTokenFailAction |
//     ISocketConnectSuccess |
//     ISocketUpdateItemPrice;

// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export function getEntireMenuSuccess(entireMenu: IMenuCategoryWithFlux[]): IGetEntireMenuSuccessAction {
//     return {
//         type: GET_ENTIRE_MENU_SUCCESS,
//         entireMenu,
//     }
// }

// export function getEntireMenuFail(): IGetEntireMenuFailAction {
//     return {
//         type: GET_ENTIRE_MENU_FAIL,
//     }
// }

// export function getEntireMenu() {
//     return (dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>) => {
//         // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
//         axios.get(`${API_SERVER}/api/items`)
//             .then((res: any) => {
//                 if (res.status === 200) {
//                     // alert(Object.keys(res.data));
//                     dispatch(getEntireMenuSuccess(res.data));
//                 } else {
//                     alert("error, status code not match: " + res.status);
//                     dispatch(getEntireMenuFail());
//                 }
//             })
//             .catch((err: any) => {
//                 alert(err);
//                 dispatch(getEntireMenuFail());
//             });
//     }
// }
// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export function addToCurrentOrder(itemId: number, itemName: string, currentPrice: number): IAddItemAction {
//     return {
//         type: ADD_ITEM,
//         item_id: itemId,
//         itemName,
//         currentPrice,
//     }
// }

// export function removeFromCurrentOrder(thisItemID: number): IRemoveItemAction {
//     return {
//         type: REMOVE_ITEM,
//         thisItemID,
//     }
// }
// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export function confirmOrderSuccess(result: any, orderToConfirm: ICurrentOrder): IConfirmOrderSuccessAction {
//     return {
//         type: CONFIRM_ORDER_SUCCESS,
//         result,
//         orderToConfirm,
//     }
// }

// export function confirmOrderFail(result: any): IConfirmOrderFailAction {
//     return {
//         type: CONFIRM_ORDER_FAIL,
//         result,
//     }
// }

// export function confirmOrder(orderToConfirm: ICurrentOrder) {
//     const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
//     return (dispatch: Dispatch<IConfirmOrderSuccessAction | IConfirmOrderFailAction>) => {
//         // axios.post(`${process.env.REACT_APP_API_DEV}/api/orders/${orderToConfirm.users_id}`, orderToConfirm, config)
//         axios.post(`${API_SERVER}/api/orders/`, orderToConfirm, config)
//             .then((res: any) => {
//                 if (res.status === 201) {
//                     alert(res.data[0].status + " now redirect to order list");
//                     // alert(JSON.stringify(res.data))
//                     dispatch(confirmOrderSuccess(res.data[0], orderToConfirm));
//                 } else {
//                     alert("error, status code not match: " + res.status);
//                     dispatch(confirmOrderFail(res.data));
//                 }
//             })
//             .catch((err: any) => {
//                 alert(err);
//                 dispatch(confirmOrderFail(err))
//             });
//     }
// }
// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export function getOrdersByUserTokenSuccess(allOrdersByOneUser: any): IGetOrdersByUserTokenSuccessAction {
//     return {
//         type: GET_ORDERS_BY_USER_TOKEN_SUCCESS,
//         allOrdersByOneUser,
//     }
// }

// export function getOrdersByUserTokenFail(): IGetOrdersByUserTokenFailAction {
//     return {
//         type: GET_ORDERS_BY_USER_TOKEN_FAIL,
//     }
// }

// export function getOrdersByUserToken() {
//     const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
//     return (dispatch: Dispatch<IGetOrdersByUserTokenSuccessAction | IGetOrdersByUserTokenFailAction>) => {
//         // axios.get(`${process.env.REACT_APP_API_DEV}/api/orders/user/${userID}`, config)
//         axios.get(`${API_SERVER}/api/orders/user/`, config)
//             .then((res: any) => {
//                 if (res.status === 200) {
//                     dispatch(getOrdersByUserTokenSuccess(res.data[0]));
//                 } else {
//                     alert("error, status code not match: " + res.status);
//                     dispatch(getOrdersByUserTokenFail());
//                 }
//             })
//             .catch((err: any) => {
//                 alert(err);
//                 dispatch(getOrdersByUserTokenFail())
//             });
//     }
// }

// /* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// export function socketConnect(socketID: any): ISocketConnectSuccess {
//     return {
//         type: SOCKET_CONNECT_SUCCESS,
//         socketID,
//     }
// }

// export function socketUpdateItemPrice(entireMenu: IMenuCategoryWithFlux[]): ISocketUpdateItemPrice {
//     return {
//         type: SOCKET_UPDATE_ITEM_PRICE,
//         entireMenu,
//     }
// }