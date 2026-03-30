import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;

};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
};

export type NewPatient = z.infer<typeof NewPatientSchema>;


export interface PatientAll extends Patient {
ssn: string;
};

export enum Gender {
    Other = 'other',
    Female = 'female',
    Male = 'male'
};