import { isAllNumbers, isNotNumber, correctArgAmount } from "./utils";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const exerciseCalculator = (week: number[], target: number): Result => {
    const periodLength = week.length;
    const trainingDays = week.filter((day) => day>0).length;
    const average = week.reduce((acc, num) => acc+num, 0)/periodLength;
    const success = average >= target;
    const score = average-target;
    let rating;
    switch (true) {
        case (score >=0):
            rating = 3;
            break;
        case (score > -(target/2) && score > -target):
            rating = 2;
            break;
        default:

            rating = 1;
    }
    let ratingDescription: string;
    switch (rating) {
        case 1:
            ratingDescription = 'Not great.';
            break;
        case 2:
            ratingDescription = 'not too bad but could be better';
            break;
        default:
            ratingDescription = 'Target was hit! Great success!';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

export const parseInputs = (target:number, week: unknown[]) => {
    if (!correctArgAmount(week, 2, Infinity)) {
        throw new Error(`Expected at least 2 arguments`);
    }


    if (isNotNumber(target)) {
        throw new Error(`${target} is not a number`);
    }
    const numberWeek = week.map(d => Number(d));
    if (!isAllNumbers(numberWeek)) {
        throw new Error(`Expected all numbers`);
    }
    return { target, week: numberWeek };
};

try {
    const { target, week } = parseInputs(Number(process.argv[2]), process.argv.slice(3).map(d => Number(d)));
    console.log(exerciseCalculator(week, target));
    
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        
    }
}
