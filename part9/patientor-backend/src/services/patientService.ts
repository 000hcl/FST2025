import { v1 as uuid } from 'uuid';

import patientData from '../../data/patients';
import { NewPatient, Patient, Gender } from '../types';

const getPatients = (): Patient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender: parseGender(gender),
        occupation
    }));
};

const addPatient = (obj: NewPatient): Patient => {
    const patient = toNewPatient(obj);
    patientData.push(patient);
    return newToPatient(obj);
};

const toNewPatient = (obj: unknown): NewPatient => {
    if ( !obj || typeof obj !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in obj && 'dateOfBirth' in obj && 'gender' in obj && 'occupation' in obj && 'ssn' in obj) {
        const patient = {
            id: uuid(),
            name: parseString(obj.name),
            dateOfBirth: parseDate(obj.dateOfBirth),
            gender: parseGender(obj.gender),
            occupation: parseString(obj.occupation),
            ssn: parseString(obj.ssn)

        };
        return patient;
    }
    throw new Error('Incorrect data: some fields are missing');
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

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing string: ${text}`);
    }
    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`${gender} is not a gender`);
    }
    return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
}
return date;
};

export default {
    getPatients,
    addPatient,
    toNewPatient
};
