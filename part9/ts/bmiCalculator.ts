const calculateBmi = (height: number, mass: number): string => {
    const mHeight = height/100
    const heightSquared = (mHeight*mHeight)
    const bmi = mass / heightSquared
    switch(true) {
        case (bmi < 16):
            return 'Underweight (Severe thinness)'
        case (bmi <= 17):
            return 'Underweight (moderate thinness)'
        case (bmi <= 18.5):
            return 'Underweight (mild thinness)'
        case (bmi <= 25):
            return 'Normal range'
        case (bmi <= 30):
            return 'Overweight (pre-obese)'
        case (bmi <= 35):
            return 'Obese (class I)'
        case (bmi <= 40):
            return 'Obese (class II)'
        default:
            return 'Obese (class III)'
    }
}

console.log(calculateBmi(180, 75))