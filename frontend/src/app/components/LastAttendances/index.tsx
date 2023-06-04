import { Accordion } from "react-bootstrap"; 
import { Table } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Col } from "react-bootstrap";
import dayjs from "dayjs";

import { AttendanceColor } from "../../enums/AttendanceColor";
import { AttendanceStatus } from "../../enums/AttendanceStatus";

type Props = {
    allAttendances: any;
}

export function LastAttendances({ allAttendances }: Props) {

    return (
        <Col md={10}>
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    );
}