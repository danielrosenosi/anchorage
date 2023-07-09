import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import { SlUserFollow } from 'react-icons/sl';
import { FiArrowRight } from "react-icons/fi";
import { BiTrashAlt } from "react-icons/bi";
import { VscEdit } from "react-icons/vsc";
import { Badge  } from "react-bootstrap";
import { Table  } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import api from "../../app/services/ConfigApi";
import { Pagination } from "../../app/components/Pagination";
import { PatientModal } from "../../app/components/PatientModal";
import { AttendanceColor } from "../../app/enums/AttendanceColor";
import { AttendanceStatus } from "../../app/enums/AttendanceStatus";

export function Patients() {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [editPatient, setEditPatient] = useState<number>();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const navigate = useNavigate();

    async function getPatients() {
        try {
            const response = await api.get(`/patients?page=${page}`, {
                params: {
                    search,
                },
            });

            setTotalPages(response.data.total);
            setItemsPerPage(response.data.per_page);
            setPatients(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletePatient(id: number) {
        try {
            await api.delete(`/patients/${id}`);

            getPatients();

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
    }, [page]);

    useEffect(() => {
        getPatients();
    }, [search]);

    return (
        <>
            <div className="d-flex align-items-center">
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 mb-3"
                    onClick={() => {
                        setShowPatientModal(true);
                        setEditPatient(0);
                    }}
                >
                    <SlUserFollow/> Paciente
                </Button>

                <div className="ms-auto">
                    <Form.Control
                        type="text"
                        placeholder="Pesquisar paciente"
                        className="mb-3 justify-content-end"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>
            
            <Table
                bordered
                responsive="sm"
                className="align-items-center overflow-hidden border rounded-3 mb-2"
            >
                <thead>
                    <tr className="bg-primary text-white">
                        <th>FOTO</th>
                        <th>NOME</th>
                        <th>CONDIÇÃO</th>
                        <th>CPF</th>
                        <th>IDADE</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>

                <tbody className="
                    bg-white
                ">
                    {patients.map((patient: Patient) => (
                        <tr key={patient.id} className="justify-content-center">
                            <td>
                                <img
                                    src={`http://localhost:8000/storage/${patient.image}`}
                                    alt={patient.fullname}
                                    width="60"
                                    height="60"
                                    className="rounded-3"
                                />
                            </td>
                            <td>
                                <p className="mt-3">{patient.fullname}</p>
                            </td>
                            <td>
                                <Badge
                                    pill
                                    bg={`${AttendanceColor[patient.last_attendance?.status] ?? 'dark'}`}
                                    className="mt-3"
                                >
                                    {AttendanceStatus[patient.last_attendance?.status] ?? "NÃO ATENDIDO"}
                                </Badge>
                            </td>
                            <td>
                                <p className="mt-3">{patient.cpf}</p>
                            </td>
                            <td>
                                <p className="mt-3">{dayjs().year() - dayjs(patient.birthdate).year()} anos</p>
                            </td>
                            <td>
                                <div className="d-flex gap-2 mt-2"> 
                                    <Button
                                        title="Atender Paciente"
                                        variant="success"
                                        onClick={() => navigate(`/attendance/${patient.id}`)}
                                    >
                                        <FiArrowRight/>
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
            
            {patients.length >= 10 && (
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        changeSelectedPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
            
            <PatientModal
                show={showPatientModal}
                onHide={() => setShowPatientModal(false)}
                getPatients={getPatients}
                patientId={editPatient}
            />
        </>
    );
}