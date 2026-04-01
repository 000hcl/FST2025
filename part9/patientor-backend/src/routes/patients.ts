import express from 'express';
import patientService from "../services/patientService";
import { NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});


router.post('/', (req, res) => {
    try {
        const patient = NewPatientSchema.parse(req.body);
        const added = patientService.addPatient(patient);
        res.json(added);
    } catch {
        res.status(400).send('Something went wrong');
    }
});


export default router;