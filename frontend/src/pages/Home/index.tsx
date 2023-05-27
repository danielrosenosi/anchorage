import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import { BiTrashAlt } from "react-icons/bi";
import { GiMedicalPack } from "react-icons/gi";
import Swal from "sweetalert2";

import api from "../../app/services/api";
import { AttendanceStatus } from "../../app/enums/AttendanceStatus";
import { AttendanceColor } from "../../app/enums/AttendanceColor";
import { PatientModal } from "../../app/components/PatientModal";

export function Home() {
    const [patients, setPatients] = useState([]);
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [editPatient, setEditPatient] = useState<number>();

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
                onClick={() => {
                    setShowPatientModal(true);
                    setEditPatient(0);
                }}
            >
                <AiOutlineUserAdd/> Paciente
            </Button>
            
            <div className="border rounded-3">
                <Table
                    striped bordered hover
                    responsive="sm"
                    className="align-items-center overflow-hidden border rounded-3"
                >
                    <thead>
                        <tr>
                            <th>FOTO</th>
                            <th>NOME</th>
                            <th>CONDIÇÃO</th>
                            <th>CPF</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((patient: Patient) => (
                            <tr key={patient.id} className="justify-content-center">
                                <td>
                                    <img
                                        src={`http://localhost:8000/storage/${patient.image}`}
                                        alt={patient.fullname}
                                        width="50"
                                        height="50"
                                        className="rounded-circle"
                                    />
                                </td>
                                <td>
                                    <p className="mt-3">{patient.fullname}</p>
                                </td>
                                <td>
                                    <span className={`mt-3 badge bg-${AttendanceColor[patient.last_attendance?.status] ?? 'dark'}`}>
                                        {AttendanceStatus[patient.last_attendance?.status] ?? "NÃO ATENDIDO"}
                                    </span>
                                </td>
                                <td>
                                    <p className="mt-3">{patient.cpf}</p>
                                </td>
                                <td>
                                    <div className="d-flex gap-2 mt-2">
                                        <Button title="Atender Paciente" variant="success">
                                            <GiMedicalPack/>
                                        </Button>

                                        <Button
                                            title="Editar Paciente"
                                            variant="primary"
                                            onClick={() => {setShowPatientModal(true); setEditPatient(patient.id)}}
                                        >
                                            <VscEdit/>
                                        </Button>

                                        <Button
                                            title="Excluir paciente"
                                            variant="danger"
                                            onClick={() => deletePatient(patient.id)}
                                        >
                                            <BiTrashAlt/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <PatientModal
                show={showPatientModal}
                onHide={() => setShowPatientModal(false)}
                getPatients={getPatients}
                patientId={editPatient}
            />
        </div>
    );
}