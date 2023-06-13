import { ChangeEvent, useState, useEffect } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

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
    const [identifier, setIdentifier] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [image, setImage] = useState<File>();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(dayjs(birthdate).isAfter(dayjs())) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "error",
                title: "Data de nascimento não deve ser futura!",
            });

            return;
        }

        if(!cpf.isValid(identifier)) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "error",
                title: "CPF inválido!",
            });

            return;
        }
        
        try {
            await api.post("/patients", {
                fullname,
                birthdate,
                identifier,
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
            setIdentifier("");
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
                identifier,
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
            setIdentifier(response.data.cpf);
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
            setIdentifier("");
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
                            value={identifier}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setIdentifier(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="phone">TELEFONE</Form.Label>

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
                        <Form.Label htmlFor="image">FOTO DO PACIENTE</Form.Label>

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