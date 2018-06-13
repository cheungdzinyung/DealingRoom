export const percentageChange = (newNumber: number, oldNumber: number): number => {
    const change = Math.round(((newNumber - oldNumber) / oldNumber) * 1000) / 100;

    return change;
}