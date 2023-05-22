import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import Swal from "sweetalert2";

import api from "../../app/services/api";
import { AttendanceStatus } from "../../app/enums/AttendanceStatus";
import { AttendanceColor } from "../../app/enums/AttendanceColor";
import { AddPatientModal } from "../../app/components/AddPatientModal";

export function Home() {
    const [patients, setPatients] = useState([]);
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    async function getPatients() {
        try {
            const response = await api.get("/patients");

            setPatients(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletePatient(id: number) {
        try {
            await api.delete(`/patients/${id}`);

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            }).fire({
                icon: "success",
                title: "Paciente excluído com sucesso!",
            });

            getPatients();
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
                title: "Erro ao excluir paciente!",
            });
        }
    }



    useEffect(() => {
        getPatients();
    }, []);

    return (
        <div className="mx-4 my-4">
            <Button
                variant="primary"
                className="mb-3"
                onClick={() => setShowAddPatientModal(true)}
            >
                <AiOutlineUserAdd/> Paciente
            </Button>

            <Table
                striped bordered hover
                responsive="sm"
                className="align-items-center"
            >
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CONDIÇÃO</th>
                        <th>CPF</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((patient: Patient) => (
                        <tr key={patient.id}>
                            <td>{patient.fullname}</td>
                            <td>
                                <span className={`badge bg-${AttendanceColor[patient.last_attendance?.status] ?? 'dark'}`}>
                                    {AttendanceStatus[patient.last_attendance?.status] ?? "NÃO ATENDIDO"}
                                </span>
                            </td>
                            <td>{patient.cpf}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="success">Atender</Button>
                                    <Button variant="primary">Editar</Button>
                                    <Button variant="danger" onClick={() => deletePatient(patient.id)}>Excluir</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddPatientModal show={showAddPatientModal} onHide={() => setShowAddPatientModal(false)} />
        </div>
    );
}