import { Form } from "react-bootstrap";

export function RespirationFrequency() {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Pressão Arterial</Form.Label>

            <Form.Control
                type="text"
                placeholder="Pressão"
            />
        </Form.Group>
    )
}