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

            <Col md={12}>
                <Row>
                    <Col md={5}>
                        <Form.Control
                            type="number"
                            placeholder="Sistólica"
                            id="systolic"
                            name="systolic"
                            required
                            value={systolic}
                            onChange={onChangeSistolic}
                        />
                    </Col>

                    <Col md={2} className="text-center mt-1">
                        <FiX />
                    </Col>

                    <Col md={5}>
                        <Form.Control
                            type="number"
                            placeholder="Diastólica"
                            id="diastolic"
                            name="diastolic"
                            required
                            value={diastolic}
                            onChange={onChangeDiastolic}
                        />
                    </Col>
                </Row>
            </Col>
        </Form.Group>
    )
}