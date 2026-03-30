export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;

};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
};

export interface NewPatient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
}