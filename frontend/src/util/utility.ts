export const percentageChange = (newNumber: number, oldNumber: number): number => {
    return Math.round(((newNumber - oldNumber) / oldNumber) * 10000) / 100;
}