import {
  DisplayActions,
  GET_ENTIRE_MENU_SUCCESS,
  GET_ENTIRE_MENU_FAIL
} from "src/redux/display/actions/actions_display";

import {
  //   IRequestItem,
  IMenuCategoryWithFlux
  //   ICustomerOrderList
} from "../../../modules";

import {singleCategoryMenuItems} from "src/fakedata"

export interface IDisplayState {
  entireMenu: IMenuCategoryWithFlux[];
}

const initialState: IDisplayState = {
  entireMenu: [singleCategoryMenuItems]
};

export const displayReducer = (
  state: IDisplayState = initialState,
  action: DisplayActions
): IDisplayState => {
  switch (action.type) {
    case GET_ENTIRE_MENU_SUCCESS: {
      return {
        ...state,
        entireMenu: action.entireMenu
      };
    }
    case GET_ENTIRE_MENU_FAIL: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
