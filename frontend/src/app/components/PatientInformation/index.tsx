import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Badge, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

import { AttendanceColor } from '../../enums/AttendanceColor';
import { AttendanceStatus } from '../../enums/AttendanceStatus';

export function PatientInformation({ fullname, cpf, birthdate, image, status }: PatientInformation) {
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md="auto">
                        <img
                            src={`http://localhost:8000/storage/${image}`}
                            alt={fullname}
                            width="80"
                            height="80"
                            className="rounded-3"
                        />
                    </Col>

                    <Col md="10">
                        <div className="d-flex flex-column fw-bolder fs-6">
                            <label className="gap-2">
                                {fullname}
                                
                                <Badge
                                    pill
                                    bg={`${AttendanceColor[status] ?? 'dark'}`}
                                    className="mt-3 ms-2"
                                >
                                    {AttendanceStatus[status] ?? "NÃO ATENDIDO"}
                                </Badge>
                            </label>
                            <label className="text-secondary">{cpf}</label>
                            <label className="text-secondary">{dayjs(birthdate).format("DD/MM/YYYY")}</label>
                        </div>
                    </Col>

                    <Col md="1" className="d-flex align-items-end justify-content-end">
                        <Button
                            variant="danger"
                            onClick={() => { navigate("/") }}
                            title="Voltar para a página inicial"
                            className="align-items-center gap-2"
                        >
                            <BiArrowBack />
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}