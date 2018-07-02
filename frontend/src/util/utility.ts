import {
  IItemPriceGraphData,
  IConsumpGraphDataDeceiveAll,
  IConsumptionGraphData
} from "src/modules";

export const percentageChange = (
  newNumber: number,
  oldNumber: number
): number => {
  return Math.round(((newNumber - oldNumber) / oldNumber) * 10000) / 100;
};

export const firstLetterCaps = (text: string): string => {
  return text
    .charAt(0)
    .toLocaleUpperCase()
    .concat(text.slice(1));
};

export const sortGraphDataArray = (
  graphArray: IItemPriceGraphData[]
): IItemPriceGraphData[] => {
  return graphArray.sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10));
};

export const switchUp = (
  data: IConsumpGraphDataDeceiveAll
): IConsumptionGraphData[] => {
  // get everything from all
  const newArray = data.all.map((single, index) => ({
    category: single.category,
    everyone: single.price,
    maxPrice: single.max,
    you: 0
  }));

  // Find category, update with user's price
  data.user.forEach((single, index) => {
    const indicator = newArray.findIndex(
      eachArray => eachArray.category === single.category
    );
    Object.assign(newArray[indicator], { you: single.price });
  });

  return newArray;
};
