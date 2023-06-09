import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

import api from "../../app/services/api";

import { Temperature } from "../../app/components/VitalSigns/Temperature";
import { RespirationFrequency } from "../../app/components/VitalSigns/RespirationFrequency";
import { BloodPressure } from "../../app/components/VitalSigns/BloodPressure";
import { PatientInformation } from "../../app/components/PatientInformation";
import { LastAttendances } from "../../app/components/LastAttendances";
import { CheckboxInput } from "../../app/components/CheckboxInput";

export function Attendance() {
    const [patient, setPatient] = useState({} as Patient);
    const [symptoms, setSymptoms] = useState([] as string[]);
    const { id } = useParams();

    async function getPatientDataForAttendance() {
        try {
            const response = await api.get(`/show-patient/${id}`);

            setPatient(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPatientDataForAttendance();
    }, [id]);

    return (
        <Container className="my-4 attendance-body">
            <Row className="mb-3">
                <Col md={12}>
                    <PatientInformation
                        fullname={patient.fullname}
                        birthdate={patient.birthdate}
                        cpf={patient.cpf}
                        image={patient.image}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <LastAttendances allAttendances={patient.all_attendances} />
            </Row>

            <Row className="mb-3">
                <Col md={12}>
                    <Card>
                        <Card.Body className="pt-9 pb-3">
                            <Form>
                                <Row>
                                    <Col md={5}>
                                        <Temperature
                                            onChange={(event: any) => console.log(event.target.value)}
                                        />
                                    
                                        <RespirationFrequency
                                            onChange={(event: any) => console.log(event.target.value)}
                                        />

                                        <BloodPressure
                                            onChangeDiastolic={(event: any) => console.log(event.target.value)}
                                            onChangeSistolic={(event: any) => console.log(event.target.value)}
                                        />
                                    </Col>

                                    <Col md="auto">
                                        <CheckboxInput
                                            name="fever"
                                            value="1"
                                            label="Febre"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="coryza"
                                            value="1"
                                            label="Coriza"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="nariz-entupido"
                                            value="1"
                                            label="Nariz Entupido"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="fatigue"
                                            value="1"
                                            label="Cansaço"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="cough"
                                            value="1"
                                            label="Tosse"
                                            onChange={(value) => console.log(value.target.value)}
                                        />
                                        
                                        <CheckboxInput
                                            name="headache"
                                            value="1"
                                            label="Dor de cabeça"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="diarrhea"
                                            value="1"
                                            label="Diarréia"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="general-discomfort"
                                            value="1"
                                            label="Mal estar geral"
                                            onChange={(value) => console.log(value.target.value)}
                                        />
                                    </Col>

                                    <Col md={3}>

                                        <CheckboxInput
                                            name="sore-throat"
                                            value="1"
                                            label="Dor de garganta"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="difficulty-breathingver"
                                            value="1"
                                            label="Dificuldade de respirar"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="lack-of-taste"
                                            value="1"
                                            label="Falta de paladar"
                                            onChange={(value) => console.log(value.target.value)}
                                        />

                                        <CheckboxInput
                                            name="lack-of-sense-of-smell"
                                            value="1"
                                            label="Falta de olfato"
                                            onChange={(value) => console.log(value.target.value)}
                                        />
                                        
                                        <CheckboxInput
                                            name="difficulty-in-locomotion"
                                            value="1"
                                            label="Dificuldade de locomoção"
                                            onChange={(value) => console.log(value.target.value)}
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