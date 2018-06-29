import { IItemPriceGraphData } from "src/modules";

export const percentageChange = (newNumber: number, oldNumber: number): number => {
    return Math.round(((newNumber - oldNumber) / oldNumber) * 10000) / 100;
}

export const firstLetterCaps = (text: string): string => {
    return (text.charAt(0).toLocaleUpperCase()).concat(text.slice(1));
}

export const sortGraphDataArray = (graphArray: IItemPriceGraphData[]): IItemPriceGraphData[] => {
    return graphArray.sort((a, b) => (parseInt(a.time, 10) - parseInt(b.time, 10)))
}