export const isNotNumber = (argument: any): boolean =>
    isNaN(Number(argument));

export const correctArgAmount = (args: string[], minLength: number, maxLength:number): boolean => {
    if (args.length-2<=maxLength && args.length >= minLength) {
        return true
    }
    return false
}

export const isAllNumbers = (args: number[]): boolean => {
    let isNumbers = true
    args.forEach((n) => {
        if (isNotNumber(n)) {
            isNumbers = false
        }
 
    })
    return isNumbers
}