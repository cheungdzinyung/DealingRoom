import {
    OrdersActions,
    ADD_ITEM,
    REMOVE_ITEM,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAIL,
} from "../actions/actions_orders";

interface IItem {
    thisItemID: string,
    uniqueID: string,
    name: string,
    ice: string,
    sweetness: string,
    garnish: string,
    purchasePrice: number,
}

interface IOrder {
    userID: string,
    table: string,
    status: string,
    item: IItem[],
}

export interface IOrdersState {
    ordersArray: IOrder[],
    currentOrder: IItem[],
    currentTotal: number,
}

const initialState = {
    ordersArray: [],
    currentOrder: [],
    currentTotal: 0,
}

export const ordersReducer = (state: IOrdersState = initialState, action: OrdersActions): IOrdersState => {
    switch (action.type) {
        case ADD_ITEM: {
            const newItem = {
                thisItemID: `${Date.now()}`,
                uniqueID: action.uniqueID,
                name: action.name,
                ice: "normal",
                sweetness: "normal",
                garnish: "normal",
                purchasePrice: 11.11, // need a redux store for all items' live price
            }
            const newTotal = (state.currentTotal*1000 + newItem.purchasePrice*1000)/1000;
            return { ...state, currentOrder: state.currentOrder.concat([newItem]), currentTotal: newTotal }
        }
        case REMOVE_ITEM: {
            const newArray = state.currentOrder.filter((e: IItem) => (e.thisItemID !== action.thisItemID));
            const newTotal = newArray.reduce((accu, e: IItem) => (accu + e.purchasePrice*1000), 0) / 1000;
            return { ...state, currentOrder: newArray, currentTotal: newTotal };
        }
        case CONFIRM_ORDER_SUCCESS: {
            const confirmedOrder = {
                userID: action.orderToConfirm.userID,
                table: action.orderToConfirm.table,
                status: "confirmed",
                item: action.orderToConfirm.item};
            return { ...state, ordersArray: state.ordersArray.concat([confirmedOrder]) }
        }
        case CONFIRM_ORDER_FAIL: {
            return state
        }
        default: {
            return state
        }
    }
}