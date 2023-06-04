import { Badge } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import dayjs from 'dayjs';

export function PatientInformation({ fullname, cpf, birthdate, image }: PatientInformation) {
    return (
        <Col md={10}>
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

                        <Col md={8}>
                            <div className="d-flex flex-column fw-bolder fs-6">
                                <label className="gap-3">
                                    {fullname} <Badge pill bg="danger">INFECTADO</Badge>
                                </label>
                                <label className="text-secondary">{cpf}</label>
                                <label className="text-secondary">{dayjs(birthdate).format("DD/MM/YYYY")}</label>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}