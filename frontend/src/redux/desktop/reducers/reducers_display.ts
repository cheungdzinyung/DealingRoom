import {
    DisplayActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
    SOCKET_CONNECT_SUCCESS,
    SOCKET_UPDATE_ITEM_PRICE,
} from "../actions/actions_display";

import {
    IMenuCategoryWithFlux,
} from "../../../modules";

export interface IDisplayState {
    // socket.io on load? isAuth?
    socketID: string,
    socketData: any,
    // init
    menuReady: boolean,
    entireMenu: IMenuCategoryWithFlux[],
    categories: string[],
    displayAPIErr: string,
    fluxArray: any,
}

const initialState: IDisplayState = {
    socketID: "",
    socketData: {},
    menuReady: false,
    entireMenu: [
        {
            "categoryName": "beer",
            "categoryPhoto": "../storage/img/beer.jpg",
            "items": [
                {
                    "items_id": 0,
                    "itemName": "Asahi",
                    "itemStock": 1,
                    "categoryName": "beer",
                    "minimumPrice": 999.00,
                    "currentPrice": 999.00,
                    "itemPhoto": "../storage/items/asahi.jpeg",
                    "itemDescription": "",
                    "isSpecial": false,
                    "isActive": true,
                    "chartData": [{ time: '', purchasePrice: 30 },
                    { time: '', purchasePrice: 40 },
                    { time: '', purchasePrice: 20 },
                    { time: '', purchasePrice: 27 },
                    { time: '', purchasePrice: 18 },
                    { time: '', purchasePrice: 23 },
                    { time: '', purchasePrice: 34 },]
                },],
        },],
    categories: [],
    displayAPIErr: "none",
    fluxArray: [],
}

export const displayReducer = (state: IDisplayState = initialState, action: DisplayActions): IDisplayState => {
    switch (action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const categories = action.entireMenu.map((category: any) => (category.categoryName));
            // process flux array
            return {
                ...state,
                entireMenu: action.entireMenu,
                categories,
                menuReady: true,
                displayAPIErr: "none"
            };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return { ...state, displayAPIErr: "GET_ENTIRE_MENU_FAIL" };
        }
        case SOCKET_CONNECT_SUCCESS: {
            return { ...state, socketID: action.socketID };
        }
        case SOCKET_UPDATE_ITEM_PRICE: {
            return { ...state, entireMenu: action.entireMenu };
            // if (action.entireMenu.hasOwnProperty("chartData")) {
            //     return { ...state, entireMenu: action.entireMenu };
            // } else {
            //     return state;
            // }
        }
        default: {
            return state;
        }
    }
}