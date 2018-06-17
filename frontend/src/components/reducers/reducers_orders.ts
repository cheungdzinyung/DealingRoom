import {
    OrdersActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    ADD_ITEM,
    REMOVE_ITEM,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAIL,
    GET_ORDERS_BY_USERID_SUCCESS,
    GET_ORDERS_BY_USERID_FAIL,
} from "../actions/actions_orders";

import {
    IRequestItem,
} from "../../modules";

export interface IOrdersState {
    entireMenu: string[],
    categories: string[],
    ordersList: any,
    unpaidOrders: number,
    currentOrder: IRequestItem[],
    currentTotal: number,
    menuReady: boolean,
    orderListReady: boolean,
}

const initialState: IOrdersState = {
    entireMenu: [],
    categories: [],
    ordersList: {
        "users_id": 0,
        "username": "John Doe",
        "displayName": "J.Doe",
        "orders":
            [{
                "orders_id": 1,
                "table": 12,
                "status": "confirmed",
                "isPaid": false,
                "orderingTime": 20170101,
                "orderItems":
                    [{
                        "itemName": "Asahi",
                        "items_id": 1,
                        "ice": "normal",
                        "sweetness": "normal",
                        "garnish": "normal",
                        "purchasePrice": 105.00
                    }]
            }]
    },
    unpaidOrders: 0,
    currentOrder: [],
    currentTotal: 0,
    menuReady: false,
    orderListReady: false,
}

export const ordersReducer = (state: IOrdersState = initialState, action: OrdersActions): IOrdersState => {
    switch (action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const categories = action.entireMenu.map((category: any) => (category.categoryName));
            return { ...state, entireMenu: action.entireMenu, categories, menuReady: true };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return state;
        }
        case ADD_ITEM: {
            // onclick: add item to current order []
            const newItem: IRequestItem = {
                thisItemID: `${Date.now()}`,            // only for current order
                items_id: action.itemid,                // from db
                itemName: action.itemName,              // from db
                ice: "normal",                          // allow mods when btn is ready
                sweetness: "less",
                garnish: "extra",
                purchasePrice: action.currentPrice,     // from db
            };
            // new total price: x1000 to avoid overflow
            const newTotal = (state.currentTotal * 1000 + newItem.purchasePrice * 1000) / 1000;
            return { ...state, currentOrder: state.currentOrder.concat([newItem]), currentTotal: newTotal };
        }
        case REMOVE_ITEM: {
            const newArray = state.currentOrder.filter((e: IRequestItem) => (e.thisItemID !== action.thisItemID));
            // new total price: x1000 to avoid overflow
            const newTotal = newArray.reduce((accu, e: IRequestItem) => (accu + e.purchasePrice * 1000), 0) / 1000;
            return { ...state, currentOrder: newArray, currentTotal: newTotal };
        }
        case CONFIRM_ORDER_SUCCESS: {
            // write to db ok, clear current order n current total, redir by action
            return { ...state, currentOrder: [], currentTotal: 0 };
        }
        case CONFIRM_ORDER_FAIL: {
            // write to db failed, keep current order in root state
            return state;
        }
        case GET_ORDERS_BY_USERID_SUCCESS: {
            // need to change data type
            const unpaidOrders = action.allOrdersByOneUser.orders.filter((e: any) => (e.isPaid === false)).length;
            return { ...state, ordersList: action.allOrdersByOneUser, unpaidOrders, orderListReady: true };
        }
        case GET_ORDERS_BY_USERID_FAIL: {
            // get fail, F5?
            return state;
        }
        default: {
            return state;
        }
    }
}