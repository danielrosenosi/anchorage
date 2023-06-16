import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap"; 
import { Table } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Col } from "react-bootstrap";
import dayjs from "dayjs";
import api from "../../services/api";

import { AttendanceColor } from "../../enums/AttendanceColor";
import { AttendanceStatus } from "../../enums/AttendanceStatus";
import { Pagination } from "../Pagination";

export function LastAttendances({ patientId }: LastAttendances) {
    const [allAttendances, setAllAttendances] = useState<Attendance[]>([] as Attendance[]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);

    async function getAttendances() {
        try {
            const response = await api.get(`/attendances/${patientId}`, {
                params: { page }
            });

            setAllAttendances(response.data.data);
            setTotalPages(response.data.total);
            setItemsPerPage(response.data.per_page);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(patientId > 0 || patientId !== undefined) {
            getAttendances();
        }
    }, [patientId, page]);

    return (
        <Col md={12}>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Últimos antedimentos</Accordion.Header>

                    <Accordion.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>DATA</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allAttendances?.map((attendance: Attendance) => (
                                    <tr key={attendance.id}>
                                        <td>{dayjs(attendance.created_at).format("DD/MM/YYYY")}</td>
                                        <td>
                                            <Badge
                                                pill
                                                bg={`${AttendanceColor[attendance.status] ?? 'dark'}`}
                                            >
                                                {AttendanceStatus[attendance.status]}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {totalPages !== 0 && (
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalPages={totalPages}
                                changeSelectedPage={setPage}
                            />
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
}