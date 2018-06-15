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
}

const initialState: IOrdersState = {
    entireMenu: [],
    categories: [],
    ordersList: {
        "users_id": 0,
        "username": "John Doe",
        "displayName": "J.Doe",
        "orders":
            [
                {
                    "orders_id": 1,
                    "table": 12,
                    "status": "confirmed",
                    "isPaid": false,
                    "orderingTime": 20170101,
                    "orderItems":
                        [
                            {
                                "itemName": "Asahi",
                                "ice": "normal",
                                "sweetness": "normal",
                                "garnish": "normal",
                                "purchasePrice": 105.00
                            }
                        ]
                }]
    },
    unpaidOrders: 0,
    currentOrder: [],
    currentTotal: 0,
}

export const ordersReducer = (state: IOrdersState = initialState, action: OrdersActions): IOrdersState => {
    switch (action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const temp: any = [];
            action.entireMenu.forEach((item: any) => {
                const findCat = temp.find((e: any) => (e.categoryName === item.categoryName));
                const newItem = item;
                newItem.chartData = {
                    datasets: [
                      {
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "rgba(235,87,87,1)",
                        borderJoinStyle: "miter",
                        data: [12, 13, 8, 16, 3, 46],
                        fill: true,
                        label: "hey",
                        pointBackgroundColor: "rgba(111, 207, 151, 1)",
                        pointBorderColor: "rgba(235, 87, 87, 1)",
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        strokeColor: "rgba(66, 66, 66, .4)"
                      }
                    ],
                    labels: ["09:00", "", "", "", "", "Now"]
                  }
                if (findCat === undefined) {
                    temp.push({ 
                        categoryName: item.categoryName,
                        items: [],
                        categoryPhoto: item.categoryPhoto
                     });
                    temp[temp.length-1].items.push(item);
                } else {
                    const i = temp.indexOf(findCat);
                    temp[i].items.push(item);
                }

            });
            const categories = temp.map((e: any) => (e.categoryName));
            return { ...state, entireMenu: temp, categories };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return state;
        }
        case ADD_ITEM: {
            // onclick: add item to current order []
            const newItem: IRequestItem = {
                thisItemID: `${Date.now()}`,    // only for current order
                item_id: action.itemid,      // from db
                itemName: action.itemName,      // from db
                ice: "normal",                  // allow mods when btn is ready
                sweetness: "less",
                garnish: "extra",
                purchasePrice: 11.11,           // from db
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
            return { ...state, ordersList: action.allOrdersByOneUser, unpaidOrders };
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