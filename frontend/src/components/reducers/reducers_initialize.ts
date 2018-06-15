import {
    InitializeActions,
    GET_ENTIRE_MENU_SUCCESS,
    GET_ENTIRE_MENU_FAIL,
} from "../actions/actions_initialize";

export interface IInitializeState {
    entireMenu: string[],
    categories: string[],
    readyMenu: boolean,
    readyProfile: boolean,
}

const initialState: IInitializeState = {
    entireMenu: [],
    categories: [],
    readyMenu: false,
    readyProfile: false,
}

export const initializeReducer = (state: IInitializeState = initialState, action: InitializeActions) => {
    switch (action.type) {
        case GET_ENTIRE_MENU_SUCCESS: {
            const temp: any = [];
            action.entireMenu.forEach((item: any) => {
                const findCat = temp.find((e: any) => (e.categoryName === item.categoryName));
                const newItem = item;
                newItem.chartData = {
                    datasets: [
                      {
                        backgroundColor: "rgba(0,0,0,0)",
                        borderColor: "rgba(235,87,87,1)",
                        borderJoinStyle: "miter",
                        data: [12, 13, 8, 16, 3, 46],
                        fill: true,
                        label: "hey",
                        pointBackgroundColor: "rgba(111, 207, 151, 1)",
                        pointBorderColor: "rgba(235, 87, 87, 1)",
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        strokeColor: "rgba(66, 66, 66, .4)"
                      }
                    ],
                    labels: ["09:00", "", "", "", "", "Now"]
                  }
                if (findCat === undefined) {
                    temp.push({ 
                        categoryName: item.categoryName,
                        items: [],
                        categoryPhoto: item.categoryPhoto
                     });
                    temp[temp.length-1].items.push(item);
                } else {
                    const i = temp.indexOf(findCat);
                    temp[i].items.push(item);
                }

            });
            const categories = temp.map((e: any) => (e.categoryName));
            return { ...state, entireMenu: temp, categories, readyMenu: true };
        }
        case GET_ENTIRE_MENU_FAIL: {
            return state;
        }
        default: {
            return state;
        }
    }
}