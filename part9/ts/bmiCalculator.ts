import { correctArgAmount, isNotNumber } from "./utils";

export const calculateBmi = (height: number, mass: number): string => {
    const mHeight = height/100;
    const heightSquared = (mHeight*mHeight);
    const bmi = mass / heightSquared;
    switch(true) {
        case (bmi < 16):
            return 'Underweight (Severe thinness)';
        case (bmi <= 17):
            return 'Underweight (moderate thinness)';
        case (bmi <= 18.5):
            return 'Underweight (mild thinness)';
        case (bmi <= 25):
            return 'Normal range';
        case (bmi <= 30):
            return 'Overweight (pre-obese)';
        case (bmi <= 35):
            return 'Obese (class I)';
        case (bmi <= 40):
            return 'Obese (class II)';
        default:
            return 'Obese (class III)';
    }
};

export const checkInputs = (args: unknown[]) => {
    if (!correctArgAmount(args, 2, 2)) {
        throw new Error(`Expected 2 arguments, got ${args.length}`);
    }
    if (isNotNumber(Number(args[0]))) {
        throw new Error(`${args[0]} is not a number`);
    }
    if (isNotNumber(Number(args[1]))) {
        throw new Error(`${args[1]} is not a number`);
    }

};
try {
    checkInputs(process.argv.slice(2));

    const height: number = Number(process.argv[2]);
    const mass: number = Number(process.argv[3]);
    console.log(calculateBmi(height, mass));

} catch(error: unknown) {
    if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        
    }
}

