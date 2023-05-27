type Patient = {
    fullname: string;
    id: number;
    name: string;
    birthdate: string;
    cpf: string;
    last_attendance: {
        id: number;
        diastolic_blood_pressure: number;
        systolic_blood_pressure: number;
        temperature: string;
        status: number;
        patient_id: number;
        created_at: string;
        updated_at: string;
    }
    phone: string;
    image: string;
}