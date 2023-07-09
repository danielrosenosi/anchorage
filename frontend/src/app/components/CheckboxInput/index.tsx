import { Form } from "react-bootstrap";

import "./styles.css";

export function CheckboxInput({ label, name, value, onChange }: CheckboxInput) {
    return (
        <Form.Group className="checkbox-input">
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