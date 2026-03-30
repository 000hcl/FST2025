import express from 'express';
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const patient = patientService.toNewPatient(req.body);
        const added = patientService.addPatient(patient);
        res.json(added);
    } catch {
        res.status(400).send('Something went wrong');
    }
});

export default router;