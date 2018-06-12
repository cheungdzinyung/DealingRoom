import {
    OrdersActions,
    ADD_ITEM,
    // REMOVE_ITEM,
} from "../actions/actions_orders";

interface IItem {
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
}

const initialState = {
    ordersArray: [],
    currentOrder: [],
}

export const ordersReducer = (state: IOrdersState = initialState, action: OrdersActions): IOrdersState => {
    switch(action.type) {
        case ADD_ITEM: {
            const newItem = {
                uniqueID: action.uniqueID,
                name: action.name,
                ice: "normal",
                sweetness: "normal",
                garnish: "normal",
                purchasePrice: 99.99, // need a redux store for all items' live price
            }
            return {...state, currentOrder: state.currentOrder.concat([newItem])}
        }
        // case REMOVE_ITEM: {
        //     // TODO
        //     return state
        // }
        default: {
            return state
        }
    }
}