import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (obj: NewPatient): Patient => {
    const id = uuid();
    obj.id = id;
    patientData.push(obj);
    return newToPatient(obj);
};

const newToPatient = (obj: NewPatient):Patient => {
    return {
        id: obj.id,
        name: obj.name,
        dateOfBirth: obj.dateOfBirth,
        gender: obj.gender,
        occupation: obj.occupation
    };
};

export default {
    getPatients,
    addPatient
}
