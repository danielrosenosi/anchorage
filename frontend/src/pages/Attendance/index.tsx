import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

import api from "../../app/services/api";

import { Temperature } from "../../app/components/VitalSigns/Temperature";
import { AttendanceColor } from "../../app/enums/AttendanceColor";
import { AttendanceStatus } from "../../app/enums/AttendanceStatus";

export function Attendance() {
    const [patient, setPatient] = useState({} as Patient);
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

    useEffect(() => {
        getPatientDataForAttendance();
    }, [id]);

    return (
        <div className="mx-4 my-4 attendance-page">
            <Row className="mb-3">
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={() => { navigate("/") }}
                        title="Voltar para a página inicial"
                    >
                        <BiArrowBack /> Voltar
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body className="pt-9 pb-3">
                            <Row>
                                <Col md="auto">
                                    <img
                                        src={`http://localhost:8000/storage/${patient.image}`}
                                        alt={patient.fullname}
                                        width="80"
                                        height="80"
                                        className="rounded-3"
                                    />
                                </Col>

                                <Col md={8}>
                                    <div className="d-flex flex-column fw-bolder fs-6">
                                        <label className="gap-3">
                                            {patient.fullname} <Badge pill bg="danger">INFECTADO</Badge>
                                        </label>
                                        <label className="text-secondary">{patient.cpf}</label>
                                        <label className="text-secondary">{dayjs(patient.birthdate).format("DD/MM/YYYY")}</label>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body className="pt-9 pb-3">
                            <Row>
                                <Col md={6}>
                                    <Temperature
                                        onChange={(value) => console.log(value.target.value)}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pressão Arterial</Form.Label>

                                        <Form.Control
                                            type="text"
                                            placeholder="Pressão"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Últimos antedimentos</Accordion.Header>

                            <Accordion.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>DATA</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patient.all_attendances?.map((attendance: any) => (
                                            <tr key={attendance.id}>
                                                <td>{dayjs(attendance.created_at).format("DD/MM/YYYY")}</td>
                                                <td>
                                                    <Badge
                                                        pill
                                                        bg={`${AttendanceColor[attendance.status] ?? 'dark'}`}
                                                    >
                                                        {AttendanceStatus[attendance.status]}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </div>
    );
}