import express from 'express';
import { checkInputs, calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (req, res) => {
  console.log(req.query.name);
  
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = String(req.query.height)
        const weight = String(req.query.weight)
        checkInputs([height, weight])
        const bmi = calculateBmi(Number(height), Number(weight))
        res.send({
            'weight': weight,
            'height': height,
            'bmi': bmi
        })
    } catch {
        res.send({
            error: "malformatted parameters"
        })
    }

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});