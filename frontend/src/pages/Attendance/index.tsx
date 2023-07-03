import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

import api from "../../app/services/ConfigApi";

import { Temperature } from "../../app/components/VitalSigns/Temperature";
import { RespirationFrequency } from "../../app/components/VitalSigns/RespirationFrequency";
import { BloodPressure } from "../../app/components/VitalSigns/BloodPressure";
import { PatientInformation } from "../../app/components/PatientInformation";
import { LastAttendances } from "../../app/components/LastAttendances";
import { CheckboxInput } from "../../app/components/CheckboxInput";
import Swal from "sweetalert2";
import { calculationAttendanceStatus } from "../../app/utils/calculationAttendanceStatus";

export function Attendance() {
    const [patient, setPatient] = useState({} as Patient);
    const [symptoms, setSymptoms] = useState({});
    const [statusCurrentAttendance, setStatusCurrentAttendance] = useState(4);
    const [temperature, setTemperature] = useState("");
    const [respirationFrequency, setRespirationFrequency] = useState("");
    const [sistolicBloodPressure, setSistolicBloodPressure] = useState("");
    const [diastolicBloodPressure, setDiastolicBloodPressure] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    async function getPatientDataForAttendance() {
        try {
            const response = await api.get(`/show-patient/${id}`);

            setPatient(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmitAttendance(event: React.FormEvent) {
        event.preventDefault();

        try {
            await api.post(`/attendance/${id}`, {
                systolic_blood_pressure: sistolicBloodPressure,
                diastolic_blood_pressure: diastolicBloodPressure,
                respiratory_frequency: respirationFrequency,
                temperature,
                symptoms
            });

            Swal.fire({
                icon: 'success',
                title: `Paciente ${patient.fullname} atendido com sucesso!`,
                showConfirmButton: true,
                timer: 1500
            });

            navigate("/");
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Erro ao atender o paciente ${patient.fullname}!`,
                showConfirmButton: true,
                timer: 1500
            });
        }
    }

    useEffect(() => {
        getPatientDataForAttendance();
    }, [id]);

    useEffect(() => {
        calculationAttendanceStatus(symptoms, setStatusCurrentAttendance)
    }, [symptoms]);

    return (
        <Container className="my-4 attendance-body">
            <Row className="mb-3">
                <Col md={12}>
                    <PatientInformation
                        fullname={patient.fullname}
                        birthdate={patient.birthdate}
                        cpf={patient.cpf}
                        image={patient.image}
                        status={statusCurrentAttendance}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <LastAttendances patientId={patient.id} />
            </Row>

            <Row className="mb-3">
                <Col md={12}>
                    <Card>
                        <Card.Body className="pt-9 pb-3">
                            <Form onSubmit={handleSubmitAttendance}>
                                <Row>
                                    <Col md={5}>
                                        <Temperature
                                            onChange={(event: any) => setTemperature(event.target.value)}
                                        />
                                    
                                        <RespirationFrequency
                                            onChange={(event: any) => setRespirationFrequency(event.target.value)}
                                        />

                                        <BloodPressure
                                            onChangeDiastolic={(event: any) => setDiastolicBloodPressure(event.target.value)}
                                            onChangeSistolic={(event: any) => setSistolicBloodPressure(event.target.value)}
                                        />
                                    </Col>

                                    <Col md="auto">
                                        <CheckboxInput
                                            name="fever"
                                            value="Febre"
                                            label="Febre"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="coryza"
                                            value="Coriza"
                                            label="Coriza"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="nariz-entupido"
                                            value="Nariz Entupido"
                                            label="Nariz Entupido"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="fatigue"
                                            value="Cansaço"
                                            label="Cansaço"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="cough"
                                            value="Tosse"
                                            label="Tosse"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />
                                        
                                        <CheckboxInput
                                            name="headache"
                                            value="Dor de cabeça"
                                            label="Dor de cabeça"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="diarrhea"
                                            value="Diarréia"
                                            label="Diarréia"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="general-discomfort"
                                            value="Mal estar geral"
                                            label="Mal estar geral"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />
                                    </Col>

                                    <Col md={3}>

                                        <CheckboxInput
                                            name="sore-throat"
                                            value="Dor de garganta"
                                            label="Dor de garganta"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="difficulty-breathingver"
                                            value="Dificuldade de respirar"
                                            label="Dificuldade de respirar"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="lack-of-taste"
                                            value="Falta de paladar"
                                            label="Falta de paladar"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />

                                        <CheckboxInput
                                            name="lack-of-sense-of-smell"
                                            value="Falta de olfato"
                                            label="Falta de olfato"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />
                                        
                                        <CheckboxInput
                                            name="difficulty-in-locomotion"
                                            value="Dificuldade de locomoção"
                                            label="Dificuldade de locomoção"
                                            onChange={(event: any) => setSymptoms(
                                                {...symptoms, [event.target.value]: event.target.value}
                                            )}
                                        />
                                    </Col>

                                    <Col md="auto" className="d-flex align-items-end justify-content-end flex-grow-1">
                                        <Button variant="primary" type="submit" className="fs-7" size="sm">
                                            Salvar Atendimento
                                        </Button>
                                    </Col>
                                </Row>  
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}