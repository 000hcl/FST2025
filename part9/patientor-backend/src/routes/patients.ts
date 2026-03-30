import express from 'express';
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    const patient = req.body;
    const added = patientService.addPatient(patient)
    res.json(added)
})

export default router;