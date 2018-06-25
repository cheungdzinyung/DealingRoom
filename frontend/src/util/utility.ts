export const percentageChange = (newNumber: number, oldNumber: number): number => {
    return Math.round(((newNumber - oldNumber) / oldNumber) * 10000) / 100;
}

export const firstLetterCaps = (text: string): string => {
    return (text.charAt(0).toLocaleUpperCase()).concat(text.slice(1));
}