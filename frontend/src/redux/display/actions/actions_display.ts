import { Action, Dispatch } from "redux";
import axios from "axios";

import { API_SERVER } from "../../store";
import { IMenuCategoryWithFlux } from "src/modules";

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export const GET_ENTIRE_MENU_SUCCESS = "GET_ENTIRE_MENU_SUCCESS";
export type GET_ENTIRE_MENU_SUCCESS = typeof GET_ENTIRE_MENU_SUCCESS;
export interface IGetEntireMenuSuccessAction extends Action {
  type: GET_ENTIRE_MENU_SUCCESS;
  entireMenu: IMenuCategoryWithFlux[];
}

export const GET_ENTIRE_MENU_FAIL = "GET_ENTIRE_MENU_FAIL";
export type GET_ENTIRE_MENU_FAIL = typeof GET_ENTIRE_MENU_FAIL;
export interface IGetEntireMenuFailAction extends Action {
  type: GET_ENTIRE_MENU_FAIL;
}

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export type DisplayActions =
  | IGetEntireMenuSuccessAction
  | IGetEntireMenuFailAction;

/* ===== ===== ===== ===== ===== ===== ===== ===== ===== */
export function getEntireMenuSuccess(
  entireMenu: IMenuCategoryWithFlux[]
): IGetEntireMenuSuccessAction {
  return {
    type: GET_ENTIRE_MENU_SUCCESS,
    entireMenu
  };
}

export function getEntireMenuFail(): IGetEntireMenuFailAction {
  return {
    type: GET_ENTIRE_MENU_FAIL
  };
}

export function getEntireMenu() {
  return (
    dispatch: Dispatch<IGetEntireMenuSuccessAction | IGetEntireMenuFailAction>
  ) => {
    // axios.get("${process.env.REACT_APP_API_DEV}/api/items")
    axios
      .get(`${API_SERVER}/api/items`)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getEntireMenuSuccess(res.data));
        } else {
          alert("error, status code not match: " + res.status);
          dispatch(getEntireMenuFail());
        }
      })
      .catch((err: any) => {
        alert(err);
        dispatch(getEntireMenuFail());
      });
  };
}
