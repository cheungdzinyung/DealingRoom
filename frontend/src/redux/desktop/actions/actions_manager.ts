// Importing modules
import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";

import { IPureMenuItem } from "../../../modules";

// Type creation
export const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
export type CREATE_ITEM_SUCCESS = typeof CREATE_ITEM_SUCCESS;
export interface ICreateItemSuccessAction extends Action {
	type: CREATE_ITEM_SUCCESS,
	itemStatus: IPureMenuItem,
	newItemArray: any,
}

export const CREATE_ITEM_FAIL = "CREATE_ITEM_FAIL";
export type CREATE_ITEM_FAIL = typeof CREATE_ITEM_FAIL;
export interface ICreateItemFailAction extends Action {
	type: CREATE_ITEM_FAIL,
	// result: any,
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// Change item status
export const CHANGE_ITEM_STATUS_SUCCESS = "CHANGE_ITEM_STATUS_SUCCESS";
export type CHANGE_ITEM_STATUS_SUCCESS = typeof CHANGE_ITEM_STATUS_SUCCESS;
export interface IChangeItemStatusSuccessAction extends Action {
	type: CHANGE_ITEM_STATUS_SUCCESS,
	itemStatus: IPureMenuItem,
	newItemArray: any,
}

export const CHANGE_ITEM_STATUS_FAIL = "CHANGE_ITEM_STATUS_FAIL";
export type CHANGE_ITEM_STATUS_FAIL = typeof CHANGE_ITEM_STATUS_FAIL;
export interface IChangeItemStatusFailAction extends Action {
	type: CHANGE_ITEM_STATUS_FAIL,
	// result: any,
}


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
// Combined types
export type ManagerActions =
	ICreateItemSuccessAction |
	ICreateItemFailAction |
	IChangeItemStatusSuccessAction |
	IChangeItemStatusFailAction;


/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function createItemSuccess(itemStatus: IPureMenuItem, newItemArray: any): ICreateItemSuccessAction {
	return {
		type: CREATE_ITEM_SUCCESS,
		itemStatus,
		newItemArray,
	}
}

export function createItemFail(): ICreateItemFailAction {
	return {
		type: CREATE_ITEM_FAIL,
		// result,
	}
}

export function createItem(itemStatus: IPureMenuItem) {
	const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
	return (dispatch: Dispatch<ICreateItemSuccessAction | ICreateItemFailAction>) => {
		axios.post(`${API_SERVER}/api/items/`, itemStatus, config)
			.then((res: any) => {
				if (res.status === 200) {
					dispatch(createItemSuccess(res.data, itemStatus));
				} else {
					alert("create item error, try again");
					dispatch(createItemFail());
				}
			})
			.catch((err: any) => {
				alert(err);
				dispatch(createItemFail());
			})
	}
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function changeItemStatusSuccess(itemStatus: IPureMenuItem, newItemArray: any): IChangeItemStatusSuccessAction {
	return {
		type: CHANGE_ITEM_STATUS_SUCCESS,
		itemStatus,
		newItemArray,
	}
}

export function changeItemStatusFail(): IChangeItemStatusFailAction {
	return {
		type: CHANGE_ITEM_STATUS_FAIL,
		// result,
	}
}

export function changeItemStatus(itemStatus: IPureMenuItem) {
	const config = { headers: { Authorization: "Bearer " + localStorage.getItem("dealingRoomToken") } }
	return (dispatch: Dispatch<IChangeItemStatusSuccessAction | IChangeItemStatusFailAction>) => {
		axios.put(`${API_SERVER}/api/items/${itemStatus.items_id}`, itemStatus, config)
			.then((res: any) => {
				if (res.status === 200) {
					dispatch(changeItemStatusSuccess(res.data, itemStatus));
				} else {
					alert("update error, try again");
					dispatch(changeItemStatusFail());
				}
			})
			.catch((err: any) => {
				alert(err);
				dispatch(changeItemStatusFail());
			})
	}
}