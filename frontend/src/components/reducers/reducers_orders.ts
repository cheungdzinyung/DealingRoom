import {
    OrdersActions,
    ADD_ITEM,
    REMOVE_ITEM,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAIL,
    GET_ORDERS_BY_USERID_SUCCESS,
    GET_ORDERS_BY_USERID_FAIL,
} from "../actions/actions_orders";

interface IItem {
    thisItemID: string,
    uniqueID: string,
    itemName: string,
    ice: string,
    sweetness: string,
    garnish: string,
    purchasePrice: number,
}

// interface IOrder {
//     userID: number,
//     table: number,
//     status: string,
//     item: IItem[],
// }

export interface IOrdersState {
    ordersList: any,
    unpaidOrders: number,
    currentOrder: IItem[],
    currentTotal: number,
}

const initialState = {
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
              "orderingTime": "2017 - 06 - 08 15: 17: 24.406432+08",
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
            }]},
    unpaidOrders : 0,
    currentOrder: [],
    currentTotal: 0,
}

export const ordersReducer = (state: IOrdersState = initialState, action: OrdersActions): IOrdersState => {
    switch (action.type) {
        case ADD_ITEM: {
            // onclick: add item to current order []
            const newItem = {
                thisItemID: `${Date.now()}`,    // only for current order
                uniqueID: action.uniqueID,      // from db
                itemName: action.itemName,      // from db
                ice: "normal",                  // allow mods when btn is ready
                sweetness: "normal",
                garnish: "normal",
                purchasePrice: 11.11,           // from db
            }
            // new total price: x1000 to avoid overflow
            const newTotal = (state.currentTotal*1000 + newItem.purchasePrice*1000)/1000;
            return { ...state, currentOrder: state.currentOrder.concat([newItem]), currentTotal: newTotal }
        }
        case REMOVE_ITEM: {
            const newArray = state.currentOrder.filter((e: IItem) => (e.thisItemID !== action.thisItemID));
            // new total price: x1000 to avoid overflow
            const newTotal = newArray.reduce((accu, e: IItem) => (accu + e.purchasePrice*1000), 0) / 1000;
            return { ...state, currentOrder: newArray, currentTotal: newTotal };
        }
        case CONFIRM_ORDER_SUCCESS: {
            // write to db ok, clear current order n current total, redir by action
            return { ...state, currentOrder: [], currentTotal: 0 }
        }
        case CONFIRM_ORDER_FAIL: {
            // write to db failed, keep current order in root state
            return state
        }
        case GET_ORDERS_BY_USERID_SUCCESS: {
            // need to change data type
            const unpaidOrders = action.allOrdersByOneUser.orders.filter((e: any) => (e.isPaid === false)).length;
            return { ...state, ordersList: action.allOrdersByOneUser, unpaidOrders }
        }
        case GET_ORDERS_BY_USERID_FAIL: {
            // get fail, F5?
            return state
        }
        default: {
            return state
        }
    }
}