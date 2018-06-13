import { Action } from "redux";
// import axios from "axios";

// interface IItem {
//     name: string,
//     ice: string,
//     sweetness: string,
//     garnish: string,
//     purchasePrice: number,
// }

// interface IOrder {
//     userID: string,
//     table: string,
//     status: string,
//     item: IItem[],
// }

export const ADD_ITEM = "ADD_ITEM";
export type ADD_ITEM = typeof ADD_ITEM;
export interface IAddItemAction extends Action {
    type: ADD_ITEM,
    uniqueID: string,
    name: string,
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export type REMOVE_ITEM = typeof REMOVE_ITEM;
export interface IRemoveItemAction extends Action {
    type: REMOVE_ITEM,
    thisItemID: string,
}

export type OrdersActions =
    IAddItemAction |
    IRemoveItemAction;

export function addToCurrentOrder(uniqueID: string, name: string): IAddItemAction {
    return {
        type: ADD_ITEM,
        uniqueID,
        name,
    }
}

export function removeFromCurrentOrder(thisItemID: string): IRemoveItemAction {
    return {
        type: REMOVE_ITEM,
        thisItemID,
    }
}