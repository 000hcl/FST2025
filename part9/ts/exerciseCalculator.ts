interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (week: number[], target: number): Result => {
    const periodLength = week.length
    const trainingDays = week.filter((day) => day>0).length
    const average = week.reduce((acc, num) => acc+num, 0)/periodLength
    const success = average >= target
    const score = average-target
    let rating = 0
    switch (true) {
        case (score >=0):
            rating = 3
            break
        case (score > -(target/2) && score > -target):
            rating = 2
            break
        default:

            rating = 1
    }
    let ratingDescription = ''
    switch (rating) {
        case 1:
            ratingDescription = 'Not great.'
            break
        case 2:
            ratingDescription = 'not too bad but could be better'
            break
        default:
            ratingDescription = 'Target was hit! Great success!'
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))