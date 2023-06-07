import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FiX } from "react-icons/fi";

type BloodPressureProps = {
    systolic?: number;
    diastolic?: number;
    onChangeSistolic?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDiastolic?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BloodPressure({ systolic, diastolic, onChangeSistolic, onChangeDiastolic }: BloodPressureProps) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Pressão arterial</Form.Label>

            <Row>
                <Col md={6}>
                    <Form.Control
                        type="number"
                        placeholder="Sistólica"
                        value={systolic}
                        onChange={onChangeSistolic}
                    />
                </Col>
                
                <Col md={1}>
                    <FiX />
                </Col>

                <Col md={5}>
                    <Form.Control
                        type="number"
                        placeholder="Diastólica"
                        value={diastolic}
                        onChange={onChangeDiastolic}
                    />
                </Col>
            </Row>
        </Form.Group>
    )
}