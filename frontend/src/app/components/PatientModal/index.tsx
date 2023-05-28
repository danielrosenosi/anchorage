import { ChangeEvent, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

import api from '../../services/api';
import { InputMask } from '../InputMask';

type Props = {
    show: boolean;
    onHide: () => void;
    getPatients: () => void;
    patientId?: number;
}

export function PatientModal({ show, onHide, getPatients, patientId }: Props) {
    const [fullname, setFullname] = useState<string>("");
    const [birthdate, setBirthdate] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [image, setImage] = useState<File>();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        try {
            await api.post("/patients", {
                fullname,
                birthdate,
                cpf,
                phone,
                image
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            getPatients();

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "success",
                title: "Paciente adicionado com sucesso!",
            });

            onHide();

            setFullname("");
            setBirthdate("");
            setCpf("");
            setPhone("");
        } catch (error) {
            console.log(error)

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "error",
                title: "Erro ao adicionar paciente!",
            })
        }
    }

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            await api.put(`/patients/${patientId}`, {
                fullname,
                birthdate,
                cpf,
                phone,
            });
            
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "success",
                title: "Paciente atualizado com sucesso!",
            });

            getPatients();
            onHide();
        } catch (error) {
            console.log(error);

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "error",
                title: "Erro ao atualizar paciente!",
            });
        }
    }

    async function getPatientData() {
        try {
            const response = await api.get(`/show-patient/${patientId}`);

            setFullname(response.data.fullname);
            setBirthdate(response.data.birthdate.split("T")[0]);
            setCpf(response.data.cpf);
            setPhone(response.data.phone);
        } catch (error) {
            console.log(error);

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "error",
                title: "Erro ao buscar dados do paciente!",
            })
        }
    }

    useEffect(() => {
        if (patientId) {
            getPatientData();
        } else {
            setFullname("");
            setBirthdate("");
            setCpf("");
            setPhone("");
        }
    }, [patientId]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {patientId ? "Editar Paciente" : "Adicionar Paciente"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={patientId ? handleUpdate : handleSubmit} encType="multipart/form-data">
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="fullname">Nome</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do paciente"
                            id="fullname"
                            name="fullame"
                            required
                            value={fullname}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setFullname(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="birthdate">Data de Nascimento</Form.Label>

                        <Form.Control
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            required
                            value={birthdate}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setBirthdate(event.target.value)}
                            
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cpf">CPF</Form.Label>

                        <InputMask
                            placeholder="Digite o CPF do paciente"
                            mask="999.999.999-99"
                            id="cpf"
                            name="cpf"
                            value={cpf}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setCpf(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cpf">TELEFONE</Form.Label>

                        <InputMask
                            placeholder="Digite o número de telefone do paciente"
                            id="phone"
                            name="phone"
                            mask="(99) 99999-9999"
                            value={phone}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cpf">FOTO DO PACIENTE</Form.Label>

                        <Form.Control
                            type="file"
                            id="image"
                            name="image"
                            required
                            onChange={(event: any) => setImage(event.target.files[0])}
                            accept="jpg, jpeg, png"
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        {patientId ? "Atualizar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}