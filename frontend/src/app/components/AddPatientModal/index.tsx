import { ChangeEvent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import api from '../../services/api';

type Props = {
    show: boolean;
    onHide: () => void;
}

export function AddPatientModal({ show, onHide }: Props) {
    const [newPatient, setNewPatient] = useState({});

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log(newPatient);
    }

    function handleChangePatientData(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof any) {
        setNewPatient({ ...newPatient, [property]: event.target.value });
    }


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Adicinar Paciente</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname">Nome</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do paciente"
                            id="fullname"
                            name="fullame"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePatientData(event, "fullname")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="birthdate">Data de Nascimento</Form.Label>

                        <Form.Control
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePatientData(event, "birthdate")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cpf">CPF</Form.Label>

                        <Form.Control
                            type="stri"
                            id="cpf"
                            name="cpf"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangePatientData(event, "birthdate")}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}