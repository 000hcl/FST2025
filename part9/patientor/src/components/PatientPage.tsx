import { useEffect, useState } from "react";
import patientService from '../services/patients';
import DiagnosisService from '../services/diagnoses';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from "../types";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const patientId = useParams().id;
    useEffect(()=> {
        const get = async () => {
            if (!patientId) return;
            const patientData = await patientService.getById(patientId);
            setPatient(patientData.data);
        };
        const getDiagnoses = async () => {
            const diagnosisData = await DiagnosisService.getAll();
            setDiagnoses(diagnosisData);
        };
        get();
        getDiagnoses();
        
    },[patientId]);

    return (
        
        <div>
            <h1>{patient?.name}</h1>
            <p>gender: {patient?.gender}</p>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h3>entries</h3>
            <div>
                {patient?.entries?.map(e => (
                    <div key={e.id}>
                        {e.date} - {e.description}
                        <div>
                            {e.diagnosisCodes?.map((c) => (
                                <li>{c} {diagnoses?.find((d) => d.code===c)?.name}</li>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientPage;