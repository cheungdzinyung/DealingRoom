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
  let newArray: IConsumptionGraphData[];
  // Restricting the length of the return chart
  if (data.all.length > 6) {
    newArray = data.all.slice(0, 6).map((single, index) => ({
      category: single.category,
      everyone: parseInt(single.price, 10),
      maxPrice: parseInt(single.max, 10),
      you: 0
    }));

    data.user.slice(0, 6).forEach((single, index) => {
      const indicator = newArray.findIndex(
        eachArray => eachArray.category === single.category
      );
      Object.assign(newArray[indicator], { you: parseInt(single.price, 10) });
    });
  } else {
    newArray = data.all.map((single, index) => ({
      category: single.category,
      everyone: parseInt(single.price, 10),
      maxPrice: parseInt(single.max, 10),
      you: 0
    }));

    data.user.forEach((single, index) => {
      const indicator = newArray.findIndex(
        eachArray => eachArray.category === single.category
      );
      Object.assign(newArray[indicator], { you: parseInt(single.price, 10) });
    });
  }

  // Find category, update with user's price

  return newArray;
};
