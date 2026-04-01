import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, Patient, Gender, PatientAll, NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: parseGender(gender),
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    const patientInfo = patientData.find((p) => p.id === id);
    if (patientInfo) {
        const patient = {
            id: patientInfo.id,
            name: patientInfo.name,
            dateOfBirth: patientInfo.dateOfBirth,
            gender: parseGender(patientInfo.gender),
            occupation: patientInfo.occupation,
            entries: [],
            ssn: patientInfo.ssn
        };
        return patient;
    } else {
        return;
    }
};

const addPatient = (obj: NewPatient): NonSensitivePatient => {
    const patient: PatientAll = {...obj, id: uuid(), entries:undefined};
    patientData.push(patient);
    return censoredPatient(patient);
};

const censoredPatient = (obj: Patient): NonSensitivePatient => {
    return {
        id: obj.id,
        name: obj.name,
        dateOfBirth: obj.dateOfBirth,
        gender: obj.gender,
        occupation: obj.occupation
    };
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`${gender} is not a gender`);
    }
    return gender;
};

export default {
    getPatients,
    addPatient,
    findById
};
