import {
  IItemPriceGraphData,
  IConsumpGraphDataDeceiveAll,
  IConsumptionGraphData,
  IConsumptionGraphDataReceiveFromServerOneCat
} from "src/modules";

// Calcualte percentage of change, returning a percentage without "%"
export const percentageChange = (
  newNumber: number,
  oldNumber: number
): number => {
  return Math.round(((newNumber - oldNumber) / oldNumber) * 10000) / 100;
};

// Converting the first letting into uppercase
export const firstLetterCaps = (text: string): string => {
  return text
    .charAt(0)
    .toLocaleUpperCase()
    .concat(text.slice(1));
};

// To return a {time, currentPrice} in cronological order
export const sortGraphDataArray = (
  graphArray: IItemPriceGraphData[]
): IItemPriceGraphData[] => {
  return graphArray.sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10));
};

// To convert the data structure to the desirable shape, and also to add in psudo data points if the array is shorter than 6 to prevent the graph from not showing anything
export const switchUp = (
  data: IConsumpGraphDataDeceiveAll
): IConsumptionGraphData[] => {
  // get everything from all
  let newArray: IConsumptionGraphData[];
  let cleanAll: IConsumptionGraphDataReceiveFromServerOneCat[];
  // let cleanUser: IConsumptionGraphDataReceiveFromServerOneCat[];

  // Restricting the length of the return chart
  if (data.all.length > 6) {
    cleanAll = data.all.slice(0, 6);
    // cleanUser = data.user.slice(0, 6);
  } else {
    cleanAll = data.all;
    // cleanUser = data.user;
  }

  // Start sorting from all
  newArray = cleanAll.map((single, index) => ({
    category: single.category,
    everyone: parseInt(single.price, 10),
    maxPrice: parseInt(single.max, 10),
    you: 0
  }));

  // Fill in data from user
  data.user.forEach((single, index) => {
    const indicator = newArray.findIndex(
      eachArray => eachArray.category === single.category
    );
    Object.assign({},newArray[indicator], { you: parseInt(single.price, 10) });
  });

  return newArray;
};
