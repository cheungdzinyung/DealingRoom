import {
  DisplayActions,
  GET_ENTIRE_MENU_SUCCESS,
  GET_ENTIRE_MENU_FAIL,
  SOCKET_CONNECT_SUCCESS,
  SOCKET_UPDATE_ITEM_PRICE,
} from "src/redux/display/actions/actions_display";

import {
  //   IRequestItem,
  IMenuCategoryWithFlux
  //   ICustomerOrderList
} from "../../../modules";

import { singleCategoryMenuItems } from "src/fakedata"

export interface IDisplayState {
  entireMenu: IMenuCategoryWithFlux[];

  // socket.io on load? isAuth?
  socketID: string,
  socketData: any,
}

const initialState: IDisplayState = {
  entireMenu: [singleCategoryMenuItems],

  socketID: "",
  socketData: {},
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
};
