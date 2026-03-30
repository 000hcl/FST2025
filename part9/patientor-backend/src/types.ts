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

export interface NewPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
};

export enum Gender {
    Other = 'other',
    Female = 'female',
    Male = 'male'
};