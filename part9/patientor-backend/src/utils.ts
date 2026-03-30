import { z } from 'zod';
import { Gender } from './types';

export const NewPatientSchema = z.object({

    name: z.string(),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    ssn: z.string()
});