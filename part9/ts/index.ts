import express from 'express';
import { checkInputs, calculateBmi } from './bmiCalculator';
import { parseInputs, exerciseCalculator } from './exerciseCalculator';

type bodyObj = {
    target: number,
    daily_exercises: number[]
};

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
  console.log(req.query.name);
  
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        checkInputs([height, weight]);
        const bmi = calculateBmi(Number(height), Number(weight));
        res.send({
            'weight': weight,
            'height': height,
            'bmi': bmi
        });
    } catch {
        res.send({
            error: "malformatted parameters"
        });
    }

});

app.post('/exercises', (req, res) => {
    const data = req.body as bodyObj;

    if (data.daily_exercises && data.target) {
        try {
            const {target, week} = parseInputs(Number(data.target), data.daily_exercises);
            const information = exerciseCalculator(week, target);
            res.send(information);
        } catch {
            res.send({
                error: "malformatted parameters"
            });
        }
    } else {
        res.send({
            error: "parameters missing"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});