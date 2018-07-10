import {
  DisplayActions,
  GET_ENTIRE_MENU_SUCCESS,
  GET_ENTIRE_MENU_FAIL,
  SOCKET_CONNECT_SUCCESS,
  SOCKET_UPDATE_ITEM_PRICE,
  SOCKET_SP_EVENT_INFO,
  TOGGLE_EVENT_BELL_RING,
} from "src/redux/display/actions/actions_display";

import {
  IMenuCategoryWithFlux,
  ISpecialEvent
} from "src/modules";

import { singleCategoryMenuItems } from "src/fakedata"

export interface IDisplayState {
  entireMenu: IMenuCategoryWithFlux[];
  // socket.io on load? isAuth?
  socketID: string,
  socketData: any,
  // sp event and bell
  eventInfo: ISpecialEvent, 
  bellRinging: boolean,
}

const initialState: IDisplayState = {
  entireMenu: [singleCategoryMenuItems],
  socketID: "",
  socketData: {},
  eventInfo: {
    sponsor: "",
    discount: 0,
    description: "",
    eventTime: new Date,
  },
  bellRinging: false,
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
      return { ...state, entireMenu: action.entireMenu };
    }
    case SOCKET_SP_EVENT_INFO: {
      // ring ring ring
      return { ...state, eventInfo: action.eventInfo, bellRinging: true };
    }
    case TOGGLE_EVENT_BELL_RING: {
      // ring ring ring
      return { ...state, bellRinging: false };
    }
    default: {
      return state;
    }
  }
};
