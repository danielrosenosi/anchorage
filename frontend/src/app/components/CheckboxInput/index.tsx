import { Form } from "react-bootstrap";

export function CheckboxInput({ label, name, value, onChange }: CheckboxInput) {
    return (
        <Form.Group className="mb-2">
            <Form.Check
                type="checkbox"
                label={label}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </Form.Group>
    )
}