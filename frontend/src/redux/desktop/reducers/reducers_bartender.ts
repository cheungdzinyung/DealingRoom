import {
    BartenderActions,
    UPDATE_STATUS_MADE_SUCCESS,
    UPDATE_STATUS_MADE_FAIL,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    SOCKET_CONNECT_SUCCESS,
    SOCKET_UPDATE_ORDER_LIST,
} from "../actions/actions_bartender";

import {
    IOrderListStaff,
} from "src/modules";

export interface IBartenderState {
    // socket.io on load? isAuth?
    socketID: string,
    socketData: any,
    // init
    allOrdersReady: boolean,
    allOrders: IOrderListStaff[],
    bartenderAPIErr: string,
}

const initialState: IBartenderState = {
    socketID: "",
    socketData: {},
    allOrdersReady: false,
    allOrders: [{
        "orders_id": 0,
        "users_id": 0,
        "displayName": "nobody",
        "table": 0,
        "status": "confirmed",
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
    bartenderAPIErr: "none",
}

export const bartenderReducer = (state: IBartenderState = initialState, action: BartenderActions): IBartenderState => {
    switch (action.type) {
        case UPDATE_STATUS_MADE_SUCCESS: {
            return state;
        }
        case UPDATE_STATUS_MADE_FAIL: {
            return { ...state, bartenderAPIErr: "UPDATE_STATUS_MADE_FAIL" };
        }
        case GET_ALL_ORDERS_SUCCESS: {
            return { ...state, allOrdersReady: true, allOrders: action.allOrders };
        }
        case GET_ALL_ORDERS_FAIL: {
            return { ...state, bartenderAPIErr: "GET_ALL_ORDERS_FAIL" };
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