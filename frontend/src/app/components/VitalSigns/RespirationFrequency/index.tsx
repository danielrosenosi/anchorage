import { Form } from "react-bootstrap";

type RespirationFrequencyProps = {
    respirationFrequency?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RespirationFrequency({ respirationFrequency, onChange }: RespirationFrequencyProps) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Frequência respiratória</Form.Label>

            <Form.Control
                type="number"
                placeholder="Frequência respiratória"
                value={respirationFrequency}
                onChange={onChange}
            />
        </Form.Group>
    );
}