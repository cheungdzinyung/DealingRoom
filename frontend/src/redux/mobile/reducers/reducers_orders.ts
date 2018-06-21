import {
    OrdersActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    ADD_ITEM,
    REMOVE_ITEM,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAIL,
    GET_ORDERS_BY_USER_TOKEN_SUCCESS,
    GET_ORDERS_BY_USER_TOKEN_FAIL,
    SOCKET_CONNECT_SUCCESS,
    SOCKET_UPDATE_ITEM_PRICE,
} from "../actions/actions_orders";

import {
    IRequestItem,
    IPureCategoryWithItem,
    IPureUsersOrderList,
} from "../../../modules";

export interface IOrdersState {
    // socket.io on load? isAuth?
    socketID: string,
    socketData: any,
    // init
    menuReady: boolean,
    orderListReady: boolean,
    entireMenu: IPureCategoryWithItem[],
    categories: string[],
    // priceMapping: {},
    // orders
    ordersList: IPureUsersOrderList,
    unpaidOrders: number,
    currentOrder: IRequestItem[],
    currentTotal: number,
}

const initialState: IOrdersState = {
    socketID: "",
    socketData: {},
    menuReady: false,
    orderListReady: false,
    // entireMenu: [],
    entireMenu: [
        {
            "categoryName": "beer",
            "categoryPhoto": "../storage/img/beer.jpg",
            "items": [
                {
                    "items_id": 0,
                    "itemName": "Asahi",
                    "itemStock": 1,
                    "minimumPrice": 999.00,
                    "currentPrice": 999.00,
                    "itemPhoto": "../storage/items/asahi.jpeg",
                    "itemDescription": "",
                    "isSpecial": false,
                    "isActive": true,
                    "chartData": [{ time: '', purchasePrice: 30 },
                    { time: '', purchasePrice: 40 },
                    { time: '', purchasePrice: 20 },
                    { time: '', purchasePrice: 27 },
                    { time: '', purchasePrice: 18 },
                    { time: '', purchasePrice: 23 },
                    { time: '', purchasePrice: 34 },]
                },],
        },],
    categories: [],
    // priceMapping: {},
    ordersList: {
        "users_id": 0,
        "username": "John Doe",
        "displayName": "J.Doe",
        "orders":
            [{
                "orders_id": 0,
                "table": 0,
                "status": "confirmed",
                "isPaid": false,
                "orderingTime": 20170101,
                "orderTotal": 0,
                "orderItems":
                    [{
                        "items_id": 1,
                        "itemName": "Asahi",
                        "purchasePrice": 0,
                        "ice": "normal",
                        "sweetness": "normal",
                        "garnish": "normal",
                    }]
            }]
    },
    unpaidOrders: 0,
    currentOrder: [],
    currentTotal: 0,
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
                thisItemID: Date.now(),                 // only for current order
                items_id: action.item_id,                // from db
                itemName: action.itemName,              // from db
                ice: "normal",                          // allow mods when btn is ready
                sweetness: "normal",
                garnish: "normal",
                purchasePrice: action.currentPrice,     // from db
                // status: "confirmed",
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
            // action.result = { users_id: num, status: str, orders_id: num, entireMenu }
            return { ...state, currentOrder: [], currentTotal: 0, entireMenu: action.result.entireMenu };
        }
        case CONFIRM_ORDER_FAIL: {
            // write to db failed, keep current order in root state
            return state;
        }
        case GET_ORDERS_BY_USER_TOKEN_SUCCESS: {
            // need to change data type
            const unpaidOrders = action.allOrdersByOneUser.orders.filter((e: any) => (e.isPaid === false)).length;
            return { ...state, ordersList: action.allOrdersByOneUser, unpaidOrders, orderListReady: true };
        }
        case GET_ORDERS_BY_USER_TOKEN_FAIL: {
            // get fail, F5?
            return state;
        }
        case SOCKET_CONNECT_SUCCESS: {
            return { ...state, socketID: action.socketID };
        }
        case SOCKET_UPDATE_ITEM_PRICE: {
            // alert(JSON.stringify(action.entireMenu))
            return { ...state, entireMenu: action.entireMenu };
        }
        default: {
            return state;
        }
    }
}