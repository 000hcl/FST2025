import { useEffect, useState } from "react";
import patientService from '../services/patients';
import { useParams } from 'react-router-dom';
import { Patient } from "../types";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const patientId = useParams().id;
    useEffect(()=> {
        const get = async () => {
            if (!patientId) return;
            const patientData = await patientService.getById(patientId);
            setPatient(patientData.data);
        };
        get();
        
    },[patientId]);

    return (
        
        <div>
            <h1>{patient?.name}</h1>
            <p>gender: {patient?.gender}</p>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
        </div>
    );
};

export default PatientPage;