export const isNotNumber = (argument: unknown): boolean =>
    isNaN(Number(argument));

export const correctArgAmount = (args: unknown[], minLength: number, maxLength:number): boolean => {
    if (args.length-2<=maxLength && args.length >= minLength) {
        return true;
    }
    return false;
};

export const isAllNumbers = (args: number[]): boolean => {
    let isNumbers = true;
    args.forEach((n) => {
        if (isNotNumber(n)) {
            isNumbers = false;
        }
 
    });
    return isNumbers;
};