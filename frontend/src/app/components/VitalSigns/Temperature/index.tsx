import { Form } from "react-bootstrap";

type TemperatureProps = {
    temperature?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Temperature({ temperature, onChange }: TemperatureProps) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Temperatura</Form.Label>

            <Form.Control
                type="number"
                placeholder="Temperatura"
                value={temperature}
                onChange={onChange}
            />
        </Form.Group>
    )
}