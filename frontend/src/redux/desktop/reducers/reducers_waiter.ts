import {
    WaiterActions,
    UPDATE_STATUS_SERVED_SUCCESS,
    UPDATE_STATUS_SERVED_FAIL,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    SOCKET_CONNECT_SUCCESS,
    SOCKET_UPDATE_ORDER_LIST,
} from "../actions/actions_waiter";

import {
    IOrderListStaff,
} from "src/modules";

export interface IWaiterState {
    // socket.io on load? isAuth?
    socketID: string,
    socketData: any,
    // init
    allOrdersReady: boolean,
    allOrders: IOrderListStaff[],
    waiterAPIErr: string,
}

const initialState: IWaiterState = {
    socketID: "",
    socketData: {},
    allOrdersReady: false,
    allOrders: [{
        "orders_id": 0,
        "users_id": 0,
        "displayName": "nobody",
        "table": 0,
        "status": "made",
        "isPaid": false,
        "order": [{
            "itemName": "Corona",
            "ice": "normal",
            "sweetness": "normal",
            "garnish": "normal",
            "purchasePrice": "60.00"
        }, {
            "itemName": "Asahi",
            "ice": "normal",
            "sweetness": "normal",
            "garnish": "normal",
            "purchasePrice": "60.00"
        }]
    }],
    waiterAPIErr: "none",
}

export const waiterReducer = (state: IWaiterState = initialState, action: WaiterActions): IWaiterState => {
    switch (action.type) {
        case UPDATE_STATUS_SERVED_SUCCESS: {
            return state;
        }
        case UPDATE_STATUS_SERVED_FAIL: {
            return { ...state, waiterAPIErr: "UPDATE_STATUS_SERVED_FAIL" };
        }
        case GET_ALL_ORDERS_SUCCESS: {
            return { ...state, allOrdersReady: true, allOrders: action.allOrders };
        }
        case GET_ALL_ORDERS_FAIL: {
            return { ...state, waiterAPIErr: "GET_ALL_ORDERS_FAIL" };
        }
        case SOCKET_CONNECT_SUCCESS: {
            return { ...state, socketID: action.socketID };
        }
        case SOCKET_UPDATE_ORDER_LIST: {
            // alert(JSON.stringify(action.allOrders))
            return { ...state, allOrders: action.allOrders };
        }
        default: {
            return state;
        }
    }
}